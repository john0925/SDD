## Why

目前的系統將所有餐點合併在單一購物車中計算營養，這對於多人點餐的情境並不準確。為了提供真正的「精準營養」體驗，我們需要實作「數位托盤」系統，讓使用者能將餐點分配給不同的用餐者，並獲得個別的營養分析結果。

## What Changes

- **托盤狀態管理**：引入托盤（Tray）概念，重構 Pinia 狀態，支援多托盤並存與切換。
- **托盤選擇器**：在菜單頁面新增下拉式托盤選擇組件。
- **托盤式結帳佈局**：重設計結帳頁面，以托盤為容器展示餐點及其獨立的營養估算。
- **評分引擎優化**：將營養均衡度演算法改為以托盤為單位進行獨立計算。

## Capabilities

### New Capabilities
- `tray-management`: 支援新增、切換、移除托盤，以及將餐點精確分配至特定托盤。
- `tray-specific-nutrition`: 針對單一托盤實作獨立的營養聚合與飲食均衡度評分。

### Modified Capabilities
- `order-checkout`: 調整結帳流程以支援托盤式的展示邏輯。

## Impact

- **前端**：重構 `useCartStore`；新增 `TraySelector` 組件；更新 `CheckoutView.vue` 與 `SuccessView.vue` 的資料流與佈局。
- **後端**：`POST /api/orders` 的資料結構需調整以包含托盤資訊。
- **UX**：降低使用者輸入負擔，透過「托盤」隱喻直覺地處理多人營養分析。
