<template>
  <div
    class="music-player"
    :class="{ minimized: isMinimized, dragging: isDragging }"
    @dblclick="toggleMinimize"
    @mouseenter="startHover"
    @mouseleave="stopHover"
    @mousedown="startDrag"
    ref="player"
    :style="{
      left: position.x + 'px',
      top: position.y + 'px',
    }"
  >
    <!-- 音乐播放器内容 -->
    <div class="music-player-content" v-if="!isMinimized">
      <!-- 音乐信息 -->
      <div class="music-info">
        <div class="song-info">
          <div class="song-name">
            {{ currentSong.name }}-<span class="artist-name">{{
              currentSong.artist
            }}</span>
          </div>
        </div>
      </div>
      <!-- 控制按钮 -->
      <div class="controls">
        <!-- 进度条 -->
        <div class="progress-container">
          <div
            class="progress-bar"
            @mousedown="startProgressDrag"
            @click="seekProgress"
          >
            <div class="progress" :style="{ width: progress + '%' }"></div>
          </div>
        </div>
        <!-- 播放控制按钮 -->
        <div class="buttons">
          <button @click="togglePlay" class="control-btn play-btn">
            <!-- 使用 v-if 动态切换图标 -->
            <i v-if="!isPlaying" class="iconfont icon-qp_icon_play"></i>
            <i v-else class="iconfont icon-qp_icon_pause"></i>
          </button>
          <button @click="nextSong" class="control-btn">
            <i class="iconfont icon-qp_icon_next-"></i>
          </button>
          <button @click="toggleMute" class="control-btn">
            <i
              :class="
                isMuted ? 'iconfont icon-volume-mute' : 'iconfont icon-volume'
              "
            ></i>
          </button>
        </div>
      </div>
    </div>
    <div v-else class="minimized-controls">
      <button @click="togglePlay" class="control-btn play-btn">
        <i v-if="!isPlaying" class="iconfont icon-qp_icon_play"></i>
        <i v-else class="iconfont icon-qp_icon_pause"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import axios from "axios";

// 定义歌曲列表
const songs = ref([]);

// 获取音乐列表
const fetchSongs = async () => {
  try {
    const response = await axios.get("http://localhost:3000/music");
    songs.value = response.data;
    console.log(songs.value);
  } catch (error) {
    console.error("Failed to fetch songs:", error);
  }
};

// 当前播放的歌曲索引
const currentSongIndex = ref(0);
// 当前播放的歌曲信息
const currentSong = ref(null);
// 是否正在播放
const isPlaying = ref(false);
// 播放进度
const progress = ref(0);
// 音量
const volume = ref(50);
// 是否静音
const isMuted = ref(false);
// 音频实例
let audio = null;
// 是否正在拖动进度条
let isDragging = ref(false);
// 是否最小化
const isMinimized = ref(true);
// 悬停计时器
let hoverTimer = null;

// 修改拖曳相关状态
const player = ref(null);
const position = ref({ x: 20, y: 80 });
const dragStart = ref({ x: 0, y: 0 });

// Fetch songs and initialize current song
onMounted(async () => {
  await fetchSongs();
  if (songs.value.length > 0) {
    currentSong.value = songs.value[0];
    audio = new Audio(currentSong.value.url);
    audio.volume = isMuted.value ? 0 : volume.value / 100;

    audio.addEventListener("timeupdate", () => {
      if (!isDragging.value) {
        progress.value = (audio.currentTime / audio.duration) * 100;
      }
    });

    audio.addEventListener("ended", () => {
      nextSong();
    });
  }
});

// Ensure event listeners are properly managed
onMounted(() => {
  window.addEventListener("mousemove", onDrag);
  window.addEventListener("mouseup", stopDrag);
  // 确保初始位置在屏幕内
  const playerWidth = player.value.offsetWidth;
  const playerHeight = player.value.offsetHeight;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  position.value = {
    x: Math.min(position.value.x, windowWidth - playerWidth),
    y: Math.min(position.value.y, windowHeight - playerHeight),
  };

  // 监听窗口大小变化
  window.addEventListener("resize", () => {
    const newX = Math.min(position.value.x, window.innerWidth - playerWidth);
    const newY = Math.min(position.value.y, window.innerHeight - playerHeight);
    position.value = { x: newX, y: newY };
  });
});

onUnmounted(() => {
  window.removeEventListener("mousemove", onDrag);
  window.removeEventListener("mouseup", stopDrag);
  if (audio) {
    audio.pause();
    audio = null;
  }
  clearTimeout(hoverTimer);
  window.removeEventListener("resize", () => {});
});

// 切换播放状态
const togglePlay = () => {
  if (!audio) return;

  if (isPlaying.value) {
    audio.pause();
  } else {
    audio.play();
  }
  isPlaying.value = !isPlaying.value;
};

// 播放下一首歌曲
const nextSong = () => {
  if (songs.value.length === 0) return;

  currentSongIndex.value = (currentSongIndex.value + 1) % songs.value.length;
  currentSong.value = songs.value[currentSongIndex.value];

  if (audio) {
    audio.src = currentSong.value.url;
    audio.load();
    if (isPlaying.value) {
      audio.play();
    }
  }
};

// 更新音量
const updateVolume = () => {
  if (audio) {
    audio.volume = isMuted.value ? 0 : volume.value / 100;
  }
};

// 切换静音
const toggleMute = () => {
  isMuted.value = !isMuted.value;
  updateVolume();
};

// 进度条点击跳转
const seekProgress = (e) => {
  if (!audio || !audio.duration) return;

  const rect = e.target.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;
  const percentage = (offsetX / rect.width) * 100;
  const newTime = (percentage / 100) * audio.duration;

  audio.currentTime = newTime;
  progress.value = percentage;
};

// 开始拖动进度条
const startProgressDrag = (e) => {
  if (e.target.closest(".progress-bar")) return; // 如果是进度条点击，不触发拖曳
  isDragging.value = true;
  dragStart.value = {
    x: e.clientX - position.value.x,
    y: e.clientY - position.value.y,
  };
  document.addEventListener("mousemove", onDrag);
  document.addEventListener("mouseup", stopDrag);
};

const onDrag = (e) => {
  if (!isDragging.value) return;

  // 计算新的位置
  let newX = e.clientX - dragStart.value.x;
  let newY = e.clientY - dragStart.value.y;

  // 获取播放器尺寸
  const playerWidth = player.value.offsetWidth;
  const playerHeight = player.value.offsetHeight;

  // 获取窗口尺寸
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  // 边界检查
  newX = Math.max(0, Math.min(newX, windowWidth - playerWidth));
  newY = Math.max(0, Math.min(newY, windowHeight - playerHeight));

  position.value = {
    x: newX,
    y: newY,
  };
};

const stopDrag = () => {
  isDragging.value = false;
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", stopDrag);
};

// 切换最小化状态
const toggleMinimize = () => {
  isMinimized.value = !isMinimized.value;
};

// 开始悬停计时
const startHover = () => {
  if (isMinimized.value) {
    hoverTimer = setTimeout(() => {
      isMinimized.value = false;
    }, 1000); // 1 second
  }
};

// 停止悬停计时
const stopHover = () => {
  clearTimeout(hoverTimer);
};

// 修改拖曳相关方法
const startDrag = (e) => {
  // 如果点击的是进度条或按钮，不触发拖曳
  if (e.target.closest(".progress-bar") || e.target.closest(".control-btn")) {
    return;
  }
  isDragging.value = true;
  dragStart.value = {
    x: e.clientX - position.value.x,
    y: e.clientY - position.value.y,
  };
  document.addEventListener("mousemove", onDrag);
  document.addEventListener("mouseup", stopDrag);
};
</script>

<style scoped>
/* 音乐播放器样式 */
.iconfont {
  font-size: 20px;
  color: #ffffff;
}

.music-player {
  position: fixed;
  top: 80px;
  width: 300px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 20px;
  border: 3px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
  z-index: 1000;
  transition: all 0.3s ease;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  cursor: move;
}

.music-player:hover {
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.2) inset;
}

.music-player.minimized {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
}

.minimized-controls {
  display: flex;
  justify-content: center;
  align-items: center;
}

.toggle-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 20px;
  padding: 5px;
  transition: transform 0.2s;
}

.toggle-btn:hover {
  transform: scale(1.1);
}

/* 音乐播放器内容样式 */
.music-player-content {
  display: flex;
  flex-direction: column;
  /* gap: 15px; */
}
.cover {
  width: 60px;
  height: 60px;
  border-radius: 5px;
  object-fit: cover;
}

.song-info {
  flex: 1;
}

.song-name {
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 5px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.artist-name {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

/* 控制按钮样式 */
.controls {
  display: flex;
  gap: 10px;
  /* flex-wrap: nowrap; */
  /* flex-direction: column; */
  /* gap: 10px; */
}

.progress-container {
  display: flex;
  align-items: center; /* 使进度条垂直居中 */
  flex: 1; /* 占据剩余空间 */
}

.progress-bar {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, #ff6b6b, #ff8e8e);
  border-radius: 2px;
  transition: width 0.1s linear;
  box-shadow: 0 0 10px rgba(255, 107, 107, 0.5);
}

.buttons {
  display: flex;
  justify-content: flex-end;
  /* gap: 20px; */
}

.control-btn {
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  font-size: 20px;
  padding: 5px;
  transition: all 0.3s ease;
}

.control-btn:hover {
  transform: scale(1.1);
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
}

.play-btn {
  font-size: 24px;
}

.play-btn:hover {
  text-shadow: 0 0 15px rgba(255, 107, 107, 0.8);
}

/* 音量控制样式 */
.volume-control {
  display: flex;
  align-items: center;
  gap: 10px;
}

.volume-control input[type="range"] {
  flex: 1;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  outline: none;
}

.volume-control input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  background: #ffffff;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

/* 添加拖曳时的视觉反馈 */
.music-player.dragging {
  opacity: 0.8;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  cursor: grabbing;
}

/* 确保进度条和按钮可以正常点击 */
.progress-bar,
.control-btn {
  cursor: pointer;
}

/* 确保进度条拖动时不会触发播放器拖动 */
.progress-bar {
  cursor: ew-resize;
}
</style>
