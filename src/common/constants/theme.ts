import { ThemeConfig } from "antd";
import { EDU_MANAGER_TOKENS } from "~/styles/token";

export const antTheme:ThemeConfig ={    
    token: {
      colorPrimary: EDU_MANAGER_TOKENS.colors["edu-primary"],
      colorBorder: EDU_MANAGER_TOKENS.colors["edu-border-color"],
      colorSuccess: EDU_MANAGER_TOKENS.colors["edu-success"],
      colorInfo: EDU_MANAGER_TOKENS.colors["edu-info"],
      colorWarning: EDU_MANAGER_TOKENS.colors["edu-warning"],
      colorError: EDU_MANAGER_TOKENS.colors["edu-danger"],
      fontFamily: "Be Vietnam Pro, sans-serif",
    },
    components: {
      Button: {
        // default or secondary button customization
        contentFontSizeSM: 12,
        borderRadiusSM: 4,
        paddingBlockSM: 4.8,
        paddingInlineSM: 12,
        controlHeightSM: 28,

        // middle button customization
        contentFontSize: 14,
        borderRadius: 6,

        // large button customization
        contentFontSizeLG: 16,
        borderRadiusLG: 8,
      },
      Popover: {
        boxShadowSecondary:
          EDU_MANAGER_TOKENS.shadow["edu-filter-box-shadow"],
      },
      Breadcrumb:{
        linkHoverColor:EDU_MANAGER_TOKENS.colors["edu-primary"]
      },
      Table:{  
        headerBg:EDU_MANAGER_TOKENS.colors["edu-secondary"],
        headerBorderRadius:0,
        headerSortHoverBg:EDU_MANAGER_TOKENS.colors["edu-secondary"],
        headerSortActiveBg:EDU_MANAGER_TOKENS.colors["edu-secondary"],
      }
    },
  }