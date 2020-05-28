<template>
  <div class="demo">
    <video-player
      class="video-player vjs-custom-skin radio"
      ref="videoPlayer"
      :playsinline="true"
      :options="playerOptions"
      @play="onPlayerPlay($event)"
      @ended="onPlayerEnded($event)"
    >
    </video-player>
    <!-- <div class="discover">化德县大棚A2玻璃温室</div> -->
  </div>
</template>

<script type="text/ecmascript-6">
export default {
	props: {
		isloop: {
			type: Boolean,
			defalt: () => {
				return true
			}
		},
		isauto: {
			type: Boolean,
			defalt: () => {
				return true
			}
		},
		videoUrl: {
			type: String,
			defalt: () => {
				return 'http://img.yopoo.cn/banner_video.mp4'
			}
		}
	},
	data() {
		return {
			playerOptions: {
				//播放速度
				playbackRates: [0.5, 1.0, 1.5, 2.0],
				//如果true,浏览器准备好时开始回放。
				autoplay: true,
				// 默认情况下将会消除任何音频。
				muted: false,
				// 导致视频一结束就重新开始。
				loop: true,
				// 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
				preload: 'auto',
				language: 'zh-CN',
				// 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
				aspectRatio: '2:1',
				// 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
				fluid: true,
				sources: [{
					//类型
					type: "video/mp4",
					// //url地址
					src: 'http://img.yopoo.cn/banner_video.mp4'
					// src: 'http://10.38.70.50/group1/M00/00/00/CiZGMl4j93KACi_vCKPcgVNano0455.mov'
					// type: "application/x-mpegURL",
					// src: "http://192.168.1.187/group1/M00/00/01/wKgBu14S7CaAJUhlAPV56sSGOuc742.avi"
				}],
				// techOrder: ['flash'],
				//你的封面地址
				poster: './img/image-2.png',
				//允许覆盖Video.js无法播放媒体源时显示的默认信息。
				notSupportedMessage: '此视频暂无法播放，请稍后再试',
				controlBar: {
					timeDivider: true,
					durationDisplay: true,
					remainingTimeDisplay: false,
					//全屏按钮
					fullscreenToggle: true
				}
			},
			isvideoend: true,
		}
	},
	watch: {
		'isvideoend': function() {
			this.$emit('getend', this.isvideoend);
			console.log(this.isvideoend)
		},
		'isloop': function(val) {
			console.log(val)
		},
		'videoUrl': function(val) {
			alert(val)
			if (val) {
				this.playerOptions.sources[0].src = this.videoUrl
				console.log(this.videoUrl)
			}
		}
	},
	computed: {
		player() {
			return this.$refs.videoPlayer.player
		}
	},
	mounted() {
		this.playerOptions.loop = this.isloop
		console.log(this.videoUrl)
	},
	methods: {
		onPlayerPlay(player) {
			console.log('player player', player)
		},
		onPlayerEnded(player) {
			this.isvideoend = false
		}
	}
}
</script>

<style lang="scss" scoped>
.demo {
  position: relative;
}
.radio {
  border-radius: 6px;
}
.discover {
  color: #fff;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 6px;
  position: absolute;
  // width: 100%;
  bottom: 5%;
  z-index: 1001;
}
::v-deep .vjs-control-bar {
  // border: 1px solid red;
  // height: 10%;
  display: flex;
  justify-content: space-between;
}
::v-deep .vjs-control-bar > div,
::v-deep .vjs-control-bar > button {
  flex: 1;
  // border: 1px solid green;
  font-size: 12px;
}
</style>
