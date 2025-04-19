<!--  简介-->
<template>
    <div class="introduction" >
        <div class="bg"></div>

    </div>
</template>

<script setup >

</script>

<style  scoped>
.introduction{
    width: 100vw;
    height: 100vh;
     
}
.bg{
    width: inherit;
    height: inherit;
    background-image: url(/public/png/bg-girl.png);
    /* background-position:  0px; */
    background-size: contain;
    background-size: cover;
    background-repeat: no-repeat;
    position: fixed;
    z-index: -1;
    
}
</style>