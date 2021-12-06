import { apis } from "@/api";
import { http } from "@/common/js/http";
import { useQuery } from "vue-query";

export const useLoginStatus = () => {
  useQuery("login-status", () => {
    http(
      {
        url: apis.loginStatus,
      },
      "artists"
    );
  });
};
