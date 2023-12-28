export default defineAppConfig({
  projectName: "Collectivo",
  projectDescription:
    "Collectivo is an open-source platform for collaboration, participation, and data management.",
  logoPath: "/img/logo.svg",
  logoLabel: "COLLECTIVO",
  ui: {
    strategy: "override",
    primary: "purple",
    button: {
      base: "focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed  flex-shrink-0 items-center justify-center transition-all disabled:bg-cv-gray-light disabled:text-[#6F7680]/50",
      font: "font-semibold",
      rounded: "rounded-lg",
      size: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-sm",
        lg: "text-sm",
        xl: "text-base",
        "2xl": "text-xl",
        base: "text-sm tracking-[0.28px] leading-[18px]",
        "28px": "text-[28px]",
        pagination: "text-xs lg:text-sm",
      },
      gap: {
        none: "gap-x-0",
        "2xs": "gap-x-1",
        xs: "gap-x-1.5",
        sm: "gap-x-2",
        md: "gap-x-2",
        lg: "gap-x-2.5",
        xl: "gap-x-2.5",
        base: "gap-x-2",
      },
      padding: {
        none: "px-0 py-0",
        "2xs": "px-2 py-1",
        xs: "px-2.5 py-1.5",
        sm: "px-5 py-4",
        md: "px-3.5 py-2.5",
        lg: "px-3.5 py-2.5",
        xl: "px-3.5 py-2.5",
        base: "px-4 py-3",
        pagination: "px-0 py-0",
      },
      square: {
        "2xs": "p-1",
        xs: "p-1.5",
        sm: "p-1.5",
        md: "p-2",
        lg: "p-2.5",
        xl: "p-2.5",
      },
      color: {
        cyan: {
          solid:
            "text-white bg-cv-cyan hover:bg-[#29A699] disabled:bg-cv-cyan/50",
        },
        gray: {
          solid:
            "text-cv-primary bg-cv-purple-light hover:bg-cv-purple-light/50 disabled:bg-cv-purple-light/30",
          outline:
            "bg-white border border-cv-purple-light text-cv-primary hover:bg-cv-purple-light/50 disabled:bg-cv-purple-light/30",
        },
        "gray-light": {
          solid:
            "text-cv-gray bg-cv-gray-light hover:bg-cv-purple-light/80 hover:text-cv-purple disabled:bg-cv-purple-light/30",
        },
        red: {
          solid:
            "text-white bg-cv-red hover:bg-[#CC4747] disabled:bg-cv-cyan/50",
        },
        purple: {
          solid: "text-white bg-cv-purple hover:bg-[#472C87]",
        },
      },
      variant: {
        solid:
          "focus-visible:outline focus-visible:outline-0 focus-visible:outline-offset-0 rounded-xl",
        // outline:
        //     'ring-1 ring-inset ring-current text-{color}-500 dark:text-{color}-400 hover:bg-{color}-50 disabled:bg-transparent dark:hover:bg-{color}-950 dark:disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400',
        // soft: 'text-{color}-500 dark:text-{color}-400 bg-{color}-50 hover:bg-{color}-100 disabled:bg-{color}-50 dark:bg-{color}-950 dark:hover:bg-{color}-900 dark:disabled:bg-{color}-950 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400',
        // ghost: 'text-{color}-500 dark:text-{color}-400 hover:bg-{color}-50 disabled:bg-transparent dark:hover:bg-{color}-950 dark:disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400',
        // link: 'text-{color}-500 hover:text-{color}-600 disabled:text-{color}-500 dark:text-{color}-400 dark:hover:text-{color}-500 dark:disabled:text-{color}-400 underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400',
      },
      default: {
        size: "sm",
        variant: "solid",
        color: "primary",
        loadingIcon: "i-heroicons-arrow-path-20-solid",
      },
      icon: {
        base: "flex-shrink-0",
        loading: "animate-spin",
        size: {
          "2xs": "h-4 w-4",
          xs: "h-4 w-4",
          sm: "h-5 w-5",
          md: "h-4 w-4",
          lg: "h-5 w-5",
          xl: "h-6 w-6",
        },
      },
    },
    badge: {
      font: "font-semibold capitalize ",
      size: {
        xs: "text-xs",
        sm: "text-sm px-3 pt-[7px] pb-1.5 leading-[17px]",
        sm2: "text-sm px-3 pt-[7px] pb-1.5 leading-[17px]",
        md: "text-sm",
        lg: "text-sm",
        xl: "text-base",
      },
      rounded: "rounded-lg",
      color: {
        cyan: {
          ghost: "bg-cv-cyan-light text-cv-cyan",
        },
        red: {
          ghost: "bg-cv-red-light text-cv-red",
        },
        orange: {
          ghost: "bg-cv-orange-light text-cv-orange",
        },
        blue: {
          ghost: "bg-cv-blue-light text-cv-blue",
        },
        gray: {
          ghost: "bg-cv-purple-light text-[#6F7680]",
        },
      },
    },
    avatar: {
      size: {
        base: "w-9 h-9",
      },
    },
    card: {
      base: "mb-5 lg:mb-10 last:mb-0",
      background: "bg-white",
      rounded: "rounded-[20px]",
      divide: "divide-none",
      ring: "ring-1 ring-[#F0F0F0]",
      shadow: "shadow-none",
      body: {
        base: "",
        background: "",
        padding: "p-5 lg:p-10",
      },
    },
    alert: {
      title: "text-lg font-semibold text-cv-primary",
      description: "text-cv-primary/60 text-sm font-medium leading-6 mt-2",
      padding: "p-3 lg:p-5",
      rounded: "rounded-xl",
      icon: {
        base: "flex-shrink-0 h-7 w-7",
      },
      color: {
        success: {
          ghost: "bg-cv-cyan-light ring-1 ring-cv-cyan/50 text-cv-cyan",
        },
        error: {
          ghost: "bg-cv-red-light ring-1 ring-cv-red/40 text-cv-red",
        },
        info: {
          ghost: "bg-cv-blue-light ring-1 ring-cv-blue/50 text-cv-blue",
        },
        warning: {
          ghost: "bg-cv-orange-light ring-1 ring-cv-orange/30 text-cv-orange",
        },
      },
    },

    notification: {
      progress: {
        background: "white",
      },
    },

    // Tabs config added by Rabiul
    tabs: {
      wrapper: "relative space-y-2 border-b border-cv-purple-light",
      container: "relative w-full",
      base: "focus:outline-none",
      list: {
        base: "relative gap-8",
        background: "dark:bg-gray-800",
        rounded: "",
        shadow: "",
        padding: "",
        height: "h-[20px]",
        width: "",
        marker: {
          wrapper:
            "absolute !h-[1px] !top-[29px] left-0 duration-200 ease-out focus:outline-none",
          base: "!h-[1px]",
          background: "bg-cv-active dark:bg-gray-900",
          rounded: "",
          shadow: "",
        },
        tab: {
          base: "relative outline-none disabled:cursor-not-allowed disabled:opacity-75 duration-200 ease-out",
          background: "",
          active: "text-cv-active dark:text-white",
          inactive: "text-cv-primary dark:text-gray-400",
          height: "",
          padding: "",
          size: "text-sm leading-none",
          font: "font-urbanist font-semibold",
          rounded: "",
          shadow: "",
        },
      },
    },
    // Modal config added by Rabiul
    modal: {
      wrapper: "relative z-50",
      inner: "fixed inset-0 overflow-y-auto",
      container:
        "flex min-h-full items-end sm:items-center justify-center text-center",
      padding: "p-4 sm:p-0",
      margin: "sm:my-8",
      base: "relative text-left rtl:text-right overflow-hidden w-full flex flex-col",
      overlay: {
        base: "fixed inset-0 transition-opacity",
        background: "bg-cv-primary/20 dark:bg-gray-800/75",
        transition: {
          enter: "ease-out duration-300",
          enterFrom: "opacity-0",
          enterTo: "opacity-100",
          leave: "ease-in duration-200",
          leaveFrom: "opacity-100",
          leaveTo: "opacity-0",
        },
      },
      background: "bg-white dark:bg-gray-900",
      ring: "",
      rounded: "border border-cv-purple-light rounded-xl",
      shadow: "",
      width: "sm:max-w-[520px]",
      height: "",
      transition: {
        enter: "ease-out duration-300",
        enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
        enterTo: "opacity-100 translate-y-0 sm:scale-100",
        leave: "ease-in duration-200",
        leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
        leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
      },
    },
    // Pagination config added by Rabiul
    pagination: {
      wrapper: "flex items-center gap-1 lg:gap-2",
      base: "h-8 w-8 lg:h-12 lg:w-12",
      color: "text-cv-active",
      rounded: "rounded-lg",
      default: {
        size: "pagination",
        activeButton: {
          size: "pagination",
          color: "purple",
          variant: "solid",
        },
        inactiveButton: {
          color: "gray",
          size: "pagination",
          variant: "outline",
        },
        prevButton: {
          color: "gray",
          size: "pagination",
          variant: "outline",
          class: "rtl:[&_span:first-child]:rotate-180",
          icon: "i-heroicons-chevron-left-20-solid w-5 h-5 lg:w-[26px] lg:h-[26px]",
        },
        nextButton: {
          color: "gray",
          size: "pagination",
          variant: "outline",
          class: "rtl:[&_span:last-child]:rotate-180",
          icon: "i-heroicons-chevron-right-20-solid w-5 h-5 lg:w-[26px] lg:h-[26px]",
        },
      },
    },

    // Forms ---------------------------------------------------------------------------------

    input: {
      wrapper: "relative",
      base: "relative block w-full disabled:cursor-default disabled:text-cv-gray tracking-[0.28px] font-medium leading-4",
      size: {
        baseSize: "text-sm leading-[18px]",
        numberInput: "text-sm leading-[18px]",
      },
      color: {
        gray: {
          outline:
            "bg-[#F4F7FE] text-cv-primary border-0 focus:ring-1 focus:ring-cv-active",
        },
      },
      variant: {
        outline: "shadow-sm bg-[#F4F7FE] text-gray-900",
      },
      padding: {
        baseSize: "py-4 px-[18px] pe-9",
        numberInput: "py-4 px-[18px] pe-[56px]",
      },
      rounded: "rounded-lg",
      placeholder:
        "placeholder:text-cv-primary/50 placeholder:font-medium placeholder:tracking-[0.28px] placeholder:leading-4",
      icon: {
        trailing: {
          wrapper:
            "absolute inset-y-0 end-[18px] flex items-center text-cv-primary/50",
        },
      },
      default: {
        size: "baseSize",
        color: "gray",
        variant: "outline",
      },
    },
    textarea: {
      base: "w-full tracking-[0.28px] font-medium",
      size: {
        baseSize: "text-sm",
      },
      color: {
        gray: {
          outline:
            "bg-[#F4F7FE] text-cv-primary border-0 focus:ring-1 focus:ring-cv-active",
        },
      },
      variant: {
        outline: "shadow-sm bg-[#F4F7FE] text-gray-900",
      },
      padding: {
        baseSize: "py-4 px-[18px]",
      },
      rounded: "rounded-lg",
      placeholder:
        "placeholder:text-cv-primary/50 placeholder:font-medium placeholder:tracking-[0.28px]",
      default: {
        size: "baseSize",
        color: "gray",
        variant: "outline",
      },
    },
    checkbox: {
      base: "h-[18px] w-[18px] disabled:cursor-not-allowed cursor-pointer disabled:opacity-50 focus:ring-0 focus:ring-transparent focus:ring-offset-transparent",
      background: "bg-transparent",
      color: "text-cv-purple",
      rounded: "rounded-[5px]",
      border: "border border-cv-gray",
      label: "text-cv-primary text-sm -ms-1 font-medium",
    },
    radioGroup: {
      wrapper: "flex items-start",
      base: "h-4 w-4 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-0 focus:ring-cv-purple focus:ring-offset-cv-active",
      color: "text-cv-purple",
      background: "bg-cv-purple dark:bg-gray-900",
      border: "border border-gray-300 dark:border-gray-700",
      ring: "focus-visible:ring-2 focus-visible:ring-cv-active  focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900",
      label: "text-sm font-medium text-gray-700 dark:text-gray-200",
      default: {
        color: "primary",
      },
    },
    radio: {
      wrapper:
        "relative flex items-start bg-[#F4F7FE] shadow-sm rounded-lg mb-2 last:mb-0 px-5 py-3",
    },
    select: {
      base: "relative block w-full disabled:cursor-default disabled:text-cv-gray tracking-[0.28px] font-medium leading-4 h-[50px]",
      rounded: "rounded-lg",
      color: {
        gray: {
          outline:
            "bg-[#F4F7FE] text-cv-primary border-0 focus:ring-1 focus:ring-cv-active",
        },
      },
      variant: {
        outline: "shadow-sm bg-[#F4F7FE] text-gray-900",
      },
      padding: {
        md: "py-4 px-[18px] pe-9",
      },
      placeholder:
        "placeholder:text-cv-primary/50 placeholder:font-medium placeholder:tracking-[0.28px] placeholder:leading-4",
      icon: {
        trailing: {
          wrapper:
            "absolute inset-y-0 end-[18px] flex items-center text-cv-primary/50",
        },
      },
      default: {
        size: "md",
        color: "gray",
        variant: "outline",
        loadingIcon: "i-heroicons-arrow-path-20-solid",
        trailingIcon: "i-heroicons-chevron-down-20-solid",
      },
    },
    selectMenu: {
      container: "z-20 group font-medium",
      width: "w-full",
      height: "max-h-60",
      base: "relative focus:outline-none overflow-y-auto scroll-py-1",
      background: "bg-white dark:bg-gray-800",
      shadow: "shadow-lg",
      rounded: "rounded-lg",
      padding: "p-[18px] space-y-[13px]",
      ring: "ring-1 ring-cv-purple-light dark:ring-cv-purple-light",
      input: `block w-[calc(100%+0.5rem)] leading-4 text-sm 
          px-[18px] py-4 text-cv-gray dark:text-gray-200 bg-white dark:bg-gray-800 border-0 
          border-b border-gray-200 dark:border-gray-700 sticky -top-1 -mt-1 
          mb-1 -mx-1 z-10 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none`,
      option: {
        base: "cursor-pointer select-none relative flex items-center justify-between gap-1",
        rounded: "rounded-md",
        padding: "",
        size: "text-sm",
        color: "text-cv-gray dark:text-white",
        container: "flex items-center gap-[13px] min-w-0",
        active: "text-cv-purple",
        inactive: "",
        selected: "pe-0",
        disabled: "cursor-not-allowed opacity-50",
        empty: "text-sm text-cv-gray font-urbanist dark:text-gray-500",
      },
      transition: {
        leaveActiveClass: "transition ease-in duration-100",
        leaveFromClass: "opacity-100",
        leaveToClass: "opacity-0",
      },
      popper: {
        placement: "bottom-end",
        offsetDistance: 5,
      },
      default: {
        selectedIcon: "",
      },
    },
  },
});
