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
            x1="1017"
            y1="45"
            x2="90"
            y2="45"
          />
          <line
            fill="#46A6B5"
            stroke="#46A6B5"
            stroke-width="2"
            stroke-miterlimit="10"
            x1="1017"
            y1="57"
            x2="90"
            y2="57"
          />
          <line
            fill="#46A6B5"
            stroke="#46A6B5"
            stroke-width="2"
            stroke-miterlimit="10"
            x1="1017"
            y1="675"
            x2="1017"
            y2="57"
          />
          <line
            fill="#46A6B5"
            stroke="#46A6B5"
            stroke-width="2"
            stroke-miterlimit="10"
            x1="932"
            y1="760"
            x2="7"
            y2="760"
          />
          <line
            fill="#46A6B5"
            stroke="#46A6B5"
            stroke-width="2"
            stroke-miterlimit="10"
            x1="6"
            y1="761"
            x2="6"
            y2="142"
          />
          <line
            fill="#46A6B5"
            stroke="#46A6B5"
            stroke-width="2"
            stroke-miterlimit="10"
            x1="91.5"
            y1="56.5"
            x2="5.167"
            y2="142.833"
          />
          <line
            fill="#46A6B5"
            stroke="#46A6B5"
            stroke-width="2"
            stroke-miterlimit="10"
            x1="90.5"
            y1="44.5"
            x2="20.667"
            y2="114.333"
          />

          <line
            fill="#46A6B5"
            stroke="#46A6B5"
            stroke-width="2"
            stroke-miterlimit="10"
            x1="1017.5"
            y1="673.5"
            x2="931.167"
            y2="759.833"
          />
        </g>
        <g id="方块">
          <polygon
            fill="#46A6B5"
            points="987.883,38 968.352,38 980.01,13 999.541,13 "
          />
          <polygon
            fill="#46A6B5"
            points="964.445,38 944.914,38 956.572,13 976.104,13 "
          />
          <polygon
            fill="#46A6B5"
            points="941.008,38 921.477,38 933.135,13 952.666,13 "
          />
          <polygon
            fill="#46A6B5"
            points="917.57,38 898.039,38 909.697,13 929.229,13 "
          />
          <polygon
            fill="#46A6B5"
            points="894.133,38 874.602,38 886.26,13 905.791,13 "
          />
          <polygon
            fill="#46A6B5"
            points="870.695,38 851.164,38 862.822,13 882.354,13 "
          />
          <polygon
            fill="#46A6B5"
            points="847.258,38 827.727,38 839.385,13 858.916,13 "
          />
          <polygon
            fill="#46A6B5"
            points="823.82,38 804.289,38 815.947,13 835.479,13 "
          />
          <polygon
            fill="#46A6B5"
            points="800.383,38 780.852,38 792.51,13 812.041,13 "
          />
          <polygon
            fill="#46A6B5"
            points="776.945,38 757.414,38 769.072,13 788.604,13 "
          />
          <polygon
            fill="#46A6B5"
            points="753.508,38 733.977,38 745.635,13 765.166,13 "
          />
          <polygon
            fill="#46A6B5"
            points="730.07,38 710.539,38 722.197,13 741.729,13 "
          />
          <polygon
            fill="#46A6B5"
            points="298.883,753 279.352,753 291.01,728 310.541,728 "
          />
          <polygon
            fill="#46A6B5"
            points="275.445,753 255.914,753 267.572,728 287.104,728"
          />
          <polygon
            fill="#46A6B5"
            points="252.008,753 232.477,753 244.135,728 263.666,728"
          />
          <polygon
            fill="#46A6B5"
            points="228.57,753 209.039,753 220.697,728 240.229,728"
          />
          <polygon
            fill="#46A6B5"
            points="205.133,753 185.602,753 197.26,728 216.791,728"
          />
          <polygon
            fill="#46A6B5"
            points="181.695,753 162.164,753 173.822,728 193.354,728"
          />
          <polygon
            fill="#46A6B5"
            points="158.258,753 138.727,753 150.385,728 169.916,728"
          />
          <polygon
            fill="#46A6B5"
            points="134.82,753 115.289,753 126.947,728 146.479,728 "
          />
          <polygon
            fill="#46A6B5"
            points="111.383,753 91.852,753 103.51,728 123.041,728"
          />
          <polygon
            fill="#46A6B5"
            points="87.945,753 68.414,753 80.072,728 99.604,728"
          />
          <polygon
            fill="#46A6B5"
            points="64.508,753 44.977,753 56.635,728 76.166,728"
          />
          <polygon
            fill="#46A6B5"
            points="41.07,753 21.539,753 33.197,728 52.729,728"
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
