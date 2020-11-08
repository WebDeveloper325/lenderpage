<template>
  <card title="Home">
    
  </card>
</template>

<script>
export default {
  middleware: 'auth',

  metaInfo() {
    return { title: 'Home' };
  },
};
</script>
