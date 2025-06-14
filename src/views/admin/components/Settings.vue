<!-- 系统设置 -->
<template>
  <div class="settings">
    <div class="header">
      <h2>系统设置</h2>
    </div>

    <el-tabs v-model="activeTab" class="settings-tabs">
      <!-- 基本设置 -->
      <el-tab-pane label="基本设置" name="basic">
        <el-form
          ref="basicForm"
          :model="basicSettings"
          :rules="basicRules"
          label-width="120px"
        >
          <el-form-item label="网站名称" prop="siteName">
            <el-input v-model="basicSettings.siteName" />
          </el-form-item>
          <el-form-item label="网站描述" prop="siteDescription">
            <el-input
              v-model="basicSettings.siteDescription"
              type="textarea"
              :rows="3"
            />
          </el-form-item>
          <el-form-item label="网站关键词" prop="siteKeywords">
            <el-input v-model="basicSettings.siteKeywords" />
            <div class="form-tip">多个关键词用英文逗号分隔</div>
          </el-form-item>
          <el-form-item label="备案信息" prop="icp">
            <el-input v-model="basicSettings.icp" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSaveBasic"
              >保存设置</el-button
            >
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <!-- 评论设置 -->
      <el-tab-pane label="评论设置" name="comment">
        <el-form ref="commentForm" :model="commentSettings" label-width="120px">
          <el-form-item label="评论审核">
            <el-switch v-model="commentSettings.requireReview" />
            <div class="form-tip">开启后，新评论需要管理员审核才能显示</div>
          </el-form-item>
          <el-form-item label="评论通知">
            <el-switch v-model="commentSettings.emailNotification" />
            <div class="form-tip">开启后，新评论会发送邮件通知</div>
          </el-form-item>
          <el-form-item label="评论防刷">
            <el-input-number
              v-model="commentSettings.commentInterval"
              :min="0"
              :max="60"
            />
            <div class="form-tip">同一IP两次评论的最小间隔时间（分钟）</div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSaveComment"
              >保存设置</el-button
            >
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <!-- 邮件设置 -->
      <el-tab-pane label="邮件设置" name="email">
        <el-form
          ref="emailForm"
          :model="emailSettings"
          :rules="emailRules"
          label-width="120px"
        >
          <el-form-item label="SMTP服务器" prop="smtpServer">
            <el-input v-model="emailSettings.smtpServer" />
          </el-form-item>
          <el-form-item label="SMTP端口" prop="smtpPort">
            <el-input-number
              v-model="emailSettings.smtpPort"
              :min="1"
              :max="65535"
            />
          </el-form-item>
          <el-form-item label="发件人邮箱" prop="senderEmail">
            <el-input v-model="emailSettings.senderEmail" />
          </el-form-item>
          <el-form-item label="发件人名称" prop="senderName">
            <el-input v-model="emailSettings.senderName" />
          </el-form-item>
          <el-form-item label="SMTP密码" prop="smtpPassword">
            <el-input v-model="emailSettings.smtpPassword" type="password" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSaveEmail"
              >保存设置</el-button
            >
            <el-button @click="handleTestEmail">测试发送</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <!-- 安全设置 -->
      <el-tab-pane label="安全设置" name="security">
        <el-form
          ref="securityForm"
          :model="securitySettings"
          label-width="120px"
        >
          <el-form-item label="登录失败限制">
            <el-input-number
              v-model="securitySettings.maxLoginAttempts"
              :min="0"
              :max="10"
            />
            <div class="form-tip">允许的最大登录失败次数，0表示不限制</div>
          </el-form-item>
          <el-form-item label="登录失败锁定">
            <el-input-number
              v-model="securitySettings.lockoutDuration"
              :min="0"
              :max="60"
            />
            <div class="form-tip">登录失败后锁定时间（分钟），0表示不锁定</div>
          </el-form-item>
          <el-form-item label="密码强度要求">
            <el-select v-model="securitySettings.passwordStrength">
              <el-option label="低" value="low" />
              <el-option label="中" value="medium" />
              <el-option label="高" value="high" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSaveSecurity"
              >保存设置</el-button
            >
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";

// 当前激活的标签页
const activeTab = ref("basic");

// 基本设置
const basicSettings = ref({
  siteName: "我的博客",
  siteDescription: "一个分享技术、生活和思考的地方",
  siteKeywords: "博客,技术,生活,思考",
  icp: "京ICP备12345678号",
});

const basicRules = {
  siteName: [{ required: true, message: "请输入网站名称", trigger: "blur" }],
  siteDescription: [
    { required: true, message: "请输入网站描述", trigger: "blur" },
  ],
};

// 评论设置
const commentSettings = ref({
  requireReview: true,
  emailNotification: true,
  commentInterval: 5,
});

// 邮件设置
const emailSettings = ref({
  smtpServer: "smtp.example.com",
  smtpPort: 465,
  senderEmail: "noreply@example.com",
  senderName: "博客系统",
  smtpPassword: "",
});

const emailRules = {
  smtpServer: [
    { required: true, message: "请输入SMTP服务器", trigger: "blur" },
  ],
  smtpPort: [{ required: true, message: "请输入SMTP端口", trigger: "blur" }],
  senderEmail: [
    { required: true, message: "请输入发件人邮箱", trigger: "blur" },
  ],
  senderName: [
    { required: true, message: "请输入发件人名称", trigger: "blur" },
  ],
};

// 安全设置
const securitySettings = ref({
  maxLoginAttempts: 5,
  lockoutDuration: 30,
  passwordStrength: "medium",
});

// 保存设置的方法
const handleSaveBasic = () => {
  // 这里应该调用API保存设置
  ElMessage.success("基本设置已保存");
};

const handleSaveComment = () => {
  // 这里应该调用API保存设置
  ElMessage.success("评论设置已保存");
};

const handleSaveEmail = () => {
  // 这里应该调用API保存设置
  ElMessage.success("邮件设置已保存");
};

const handleTestEmail = () => {
  // 这里应该调用API测试邮件发送
  ElMessage.success("测试邮件已发送");
};

const handleSaveSecurity = () => {
  // 这里应该调用API保存设置
  ElMessage.success("安全设置已保存");
};
</script>

<style scoped>
.settings {
  padding: 20px;
}

.header {
  margin-bottom: 20px;
}

.settings-tabs {
  background: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.form-tip {
  font-size: 12px;
  color: #909399;
  margin-top: 4px;
}
</style>
