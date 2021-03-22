const styles = {
  white: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  black: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  blue: (opacity = 1) => `rgba(5, 59, 249, ${opacity})`,
  topBarHeight: 40,
  footerMenuHeight: 50,
  showFooterMenuText: ({windowWidth}) => windowWidth > 500,
  showSidebar: ({windowWidth}) => windowWidth > 768,
  topMenuCollapsed: ({windowWidth}) => windowWidth < 1100,
  topMenuHeight: ({windowWidth}) => windowWidth < 900 ? 60 : 80,
  paddingLeftRight: ({windowWidth}) => windowWidth < 900 ? 20 : 150,
  fullScreenMenuFontSize: ({windowWidth}) => windowWidth < 900 ? 16 : 18,
  showSubLogoText: ({windowWidth}) => windowWidth > 650,
  roundedImageSize: ({windowWidth}) => windowWidth < 900 ? 96 : 128,
};
export default styles;
