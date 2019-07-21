<template>

  <b-row>

    <b-col sm="12" class="m-0 p-0">

      <PhotoEditor
        asset-path="/static"
        license='{"owner": ...}'
        image-path='/static/images/auth/lockscreen-bg.jpg'
      />

    </b-col>

  </b-row>

</template>
<script>
  import 'photoeditorsdk/css/PhotoEditorSDK.UI.DesktopUI.min.css'
  import 'photoeditorsdk/css/PhotoEditorSDK.UI.ReactUI.min.css'

  import PhotoEditor from 'vue-pesdk'

  export default {
    components: { PhotoEditor }
  }
</script>
