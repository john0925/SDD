## 1. 基礎架構與套件準備

- [x] 1.1 安裝 `vue-router` 與 `pinia` 套件。
- [x] 1.2 設定 Vue Router 路由表（Home, Checkout, Success）。
- [x] 1.3 初始化 Pinia `cart` store，定義購物車狀態與動作。

## 2. 後端資料與 API 擴充

- [x] 2.1 更新 `Backend/App_Data/meals.json` 加入 `Attributes` 標籤。
- [x] 2.2 更新後端 `Meal` 模型以對應新的 JSON 欄位.
- [x] 2.3 建立 `POST /api/orders` 端點，模擬訂單編號產生與營養評分計算。

## 3. 前端功能實作

- [x] 3.1 串接菜單「加入購物車」按鈕至 Pinia Store。
- [x] 3.2 實作 `CheckoutView.vue`：
    - [x] 展示餐點清單與小計。
    - [x] 實作取餐時間選取器（預設 +30min）。
    - [x] 實作即時營養聚合展示。
- [x] 3.3 實作營養評分引擎（歐幾里得距離演算法）。
- [x] 3.4 實作 `SuccessView.vue`：
    - [x] 展示訂單編號與取餐地圖。
    - [x] 展示最終營養分析報告與均衡度評分。

## 4. 整合測試與優化

- [x] 4.1 驗證從首頁到結帳、最後到成功的完整流程。
- [x] 4.2 檢查各頁面的響應式佈局與 `DESIGN.md` 風格還原度。
- [x] 4.3 驗證營養評分演算法的邊界案例（如空購物車、極端熱量值）。
