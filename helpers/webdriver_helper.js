exports.setDriverSize = function (size) {
  switch (size.toUpperCase()) {
    case 'S': // .col-xs-$ - Extra Small - Phones Less than 768px;
      drv.manage().window().setSize(768 / 2, BROWSER_HEIGHT);
      drv.widthSize = 'S';
      break;
    case 'M': // .col-sm-$ - Small Devices - Tablets 768px and Up;
      drv.manage().window().setSize(992 - 10, BROWSER_HEIGHT);
      drv.widthSize = 'M';
      break;
    case 'L': // .col-md-$ and .col-lg-$ - Desktops 992px and Up.
      drv.manage().window().setSize(1200, BROWSER_HEIGHT);
      drv.widthSize = 'L';
      break;
    default: // do not resize browser
      break;
  }
  return drv;
};
