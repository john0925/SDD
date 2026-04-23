## 1. 核心狀態重構 (Pinia)

- [x] 1.1 修改 `cart.ts` 定義 `Tray` 介面，並將單一 `items` 陣列升級為 `trays` 陣列。
- [x] 1.2 實作 `activeTrayId` 狀態與 `addTray`, `removeTray`, `switchTray` 動作。
- [x] 1.3 更新 `addToCart` 邏輯，確保餐點被加入至當前 `activeTrayId` 指向的托盤。
- [x] 1.4 將評分演算法封裝為可接收托盤資料的通用函式。

## 2. 前端組件開發 (Tray Selector)

- [x] 2.1 建立 `TraySelector.vue` 下拉式組件。
- [x] 2.2  `HomeView.vue` 游豢剁銝血祕雿憓扎翰瑟
- [x] 2.3 更新 `TopNavBar.vue` 確保購物車圖示顯示的是全訂單總件數。

## 3. 結帳與成功頁面重設計

- [x] 3.1 重設計 `CheckoutView.vue` 佈局：
    - [x] 以托盤為單位渲染餐點列表（使用 `v-for="tray in trays"`）。
    - [x] 實作每個托盤卡片的右側/下方獨立營養估算區。
    - [x] 保持頁面底部的整筆訂單總額摘要。
- [x] 3.2 更新 `SuccessView.vue` 展示各托盤的最終均衡度報告。

## 4. 資料傳輸與整合驗證

- [x] 4.1 調整 `POST /api/orders` 的請求格式，將餐點按托盤分組傳送給後端。
- [x] 4.2 驗證自動建立「托盤 1」的初始化邏輯。
- [x] 4.3 測試跨托盤移動餐點（選修）或正確分配餐點的準確性。
