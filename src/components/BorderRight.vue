<template>
  <div class="border-box">
    <div class="border-svg">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="100%"
        height="100%"
        viewBox="0 0 1024 768"
        enable-background="new 0 0 1024 768"
        xml:space="preserve"
        preserveAspectRatio="none"
      >
        <g id="线框">
          <line
            fill="#46A6B5"
            stroke="#46A6B5"
            stroke-width="2"
            stroke-miterlimit="10"
            x1="8"
            y1="45"
            x2="935"
            y2="45"
          />
          <line
            fill="#46A6B5"
            stroke="#46A6B5"
            stroke-width="2"
            stroke-miterlimit="10"
            x1="8"
            y1="57"
            x2="935"
            y2="57"
          />
          <line
            fill="#46A6B5"
            stroke="#46A6B5"
            stroke-width="2"
            stroke-miterlimit="10"
            x1="8"
            y1="675"
            x2="8"
            y2="57"
          />
          <line
            fill="#46A6B5"
            stroke="#46A6B5"
            stroke-width="2"
            stroke-miterlimit="10"
            x1="93"
            y1="760"
            x2="1018"
            y2="760"
          />
          <line
            fill="#46A6B5"
            stroke="#46A6B5"
            stroke-width="2"
            stroke-miterlimit="10"
            x1="1019"
            y1="761"
            x2="1019"
            y2="142"
          />
          <line
            fill="#46A6B5"
            stroke="#46A6B5"
            stroke-width="2"
            stroke-miterlimit="10"
            x1="933.167"
            y1="56.5"
            x2="1019.5"
            y2="142.833"
          />
          <line
            fill="#46A6B5"
            stroke="#46A6B5"
            stroke-width="2"
            stroke-miterlimit="10"
            x1="934.167"
            y1="44.5"
            x2="1004"
            y2="114.333"
          />
          <line
            fill="#46A6B5"
            stroke="#46A6B5"
            stroke-width="2"
            stroke-miterlimit="10"
            x1="7.167"
            y1="673.5"
            x2="93.5"
            y2="759.833"
          />
        </g>
        <g id="方块">
          <polygon
            fill="#46A6B5"
            points="36.784,38 56.315,38 44.657,13 25.126,13"
          />
          <polygon
            fill="#46A6B5"
            points="60.222,38 79.753,38 68.095,13 48.563,13"
          />
          <polygon
            fill="#46A6B5"
            points="83.659,38 103.19,38 91.532,13 72.001,13"
          />
          <polygon
            fill="#46A6B5"
            points="107.097,38 126.628,38 114.97,13 95.438,13"
          />
          <polygon
            fill="#46A6B5"
            points="130.534,38 150.065,38 138.407,13 118.876,13"
          />
          <polygon
            fill="#46A6B5"
            points="153.972,38 173.503,38 161.845,13 142.313,13"
          />
          <polygon
            fill="#46A6B5"
            points="177.409,38 196.94,38 185.282,13 165.751,13"
          />
          <polygon
            fill="#46A6B5"
            points="200.847,38 220.378,38 208.72,13 189.188,13"
          />
          <polygon
            fill="#46A6B5"
            points="224.284,38 243.815,38 232.157,13 212.626,13"
          />
          <polygon
            fill="#46A6B5"
            points="247.722,38 267.253,38 255.595,13 236.063,13"
          />
          <polygon
            fill="#46A6B5"
            points="271.159,38 290.69,38 279.032,13 259.501,13"
          />
          <polygon
            fill="#46A6B5"
            points="294.597,38 314.128,38 302.47,13 282.938,13"
          />
          <polygon
            fill="#46A6B5"
            points="725.784,753 745.315,753 733.657,728 714.126,728"
          />
          <polygon
            fill="#46A6B5"
            points="749.222,753 768.753,753 757.095,728 737.563,728"
          />
          <polygon
            fill="#46A6B5"
            points="772.659,753 792.19,753 780.532,728 761.001,728"
          />
          <polygon
            fill="#46A6B5"
            points="796.097,753 815.628,753 803.97,728 784.438,728"
          />
          <polygon
            fill="#46A6B5"
            points="819.534,753 839.065,753 827.407,728 807.876,728"
          />
          <polygon
            fill="#46A6B5"
            points="842.972,753 862.503,753 850.845,728 831.313,728"
          />
          <polygon
            fill="#46A6B5"
            points="866.409,753 885.94,753 874.282,728 854.751,728"
          />
          <polygon
            fill="#46A6B5"
            points="889.847,753 909.378,753 897.72,728 878.188,728"
          />
          <polygon
            fill="#46A6B5"
            points="913.284,753 932.815,753 921.157,728 901.626,728"
          />
          <polygon
            fill="#46A6B5"
            points="936.722,753 956.253,753 944.595,728 925.063,728"
          />
          <polygon
            fill="#46A6B5"
            points="960.159,753 979.69,753 968.032,728 948.501,728"
          />
          <polygon
            fill="#46A6B5"
            points="983.597,753 1003.128,753 991.47,728 971.938,728"
          />
        </g>
      </svg>
    </div>
    <div class="border-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.border-box {
  width: 100%;
  height: 100%;
  position: relative;
}
.border-svg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.border-content {
  width: 100%;
  height: 100%;
  padding: 10% 5%;
  box-sizing: border-box;
}
</style>
