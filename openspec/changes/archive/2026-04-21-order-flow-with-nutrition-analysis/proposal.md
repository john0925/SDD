## Why

「健康日常」目前的原型僅具備靜態選購功能。為了提供完整的商業閉環，並強化品牌「精準營養」的核心價值，我們需要實作完整的購物車結帳流程，並引入「智慧營養均衡度分析」系統，讓使用者在下單後能即時獲得專業的飲食回饋。

## What Changes

- **購物車狀態管理**：引入 Pinia 實作全域購物車狀態，支援跨頁面資料傳遞。
- **結帳頁面實作**：根據 `checkout.html` 實作餐點清單、取餐時間與即時營養聚合計算。
- **營養均衡度演算法**：實作基於歐幾里得距離的評分引擎，計算 P/C/F 佔比與熱量達成度。
- **訂單完成頁面**：根據 `success.html` 展示訂單編號、取餐資訊與營養分析報告。
- **後端 API 擴充**：新增 `POST /api/orders` 模擬訂單建立邏輯。

## Capabilities

### New Capabilities
- `order-checkout`: 處理結帳流程、取餐時間設定與訂單摘要計算。
- `smart-nutrition-analysis`: 實作精準營養評分引擎，包含 P/C/F 比例偏差與熱量達成度計算。

### Modified Capabilities
- `meal-catalog`: 擴充餐點屬性（如非精製澱粉、多樣蔬菜標籤）以支援評分獎勵。

## Impact

- **前端**：新增 `CheckoutView`, `SuccessView`；引入 `vue-router` 與 `pinia`。
- **後端**：擴充 `meals.json` 欄位；新增訂單處理端點。
- **使用者體驗**：從靜態展示轉化為具備即時數據回饋的動態應用程式。
