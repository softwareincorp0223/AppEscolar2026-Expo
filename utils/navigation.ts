import { router } from "expo-router";

export const navigateToParentLogin = () => {
  if (router.canDismiss()) {
    router.dismissAll();
  }

  router.replace("/pages/login" as never);
};
