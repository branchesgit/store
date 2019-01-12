import ProductCodes from "../pages/management/system/running/component/ProductCodes";
import CommonSettings from "../pages/management/system/running/component/CommonSettings";

export const RUNNING_SETTINGS = [
    {
        name: "通用设置",
        key: "1",
        comp: CommonSettings,
    },
    {
        name: "编码品名生成规则设置",
        key: "2",
        comp: ProductCodes,
    }
];
