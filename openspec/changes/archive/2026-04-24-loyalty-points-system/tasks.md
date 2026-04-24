## 1. 基礎資料調整 (Data)

- [x] 1.1 更新 `Backend/App_Data/meals.json`：將所有餐點價格調整至 $150 - $199 區間
- [x] 1.2 確保 `Backend/Models/Meal.cs` 中的 `Price` 欄位與 JSON 資料對應正確

## 2. 前端狀態管理擴充 (Store)

- [x] 2.1 修改 `Frontend/src/store/cart.ts`：新增 `loyaltyPoints` 狀態並支援 localStorage 持久化
- [x] 2.2 在 `cart.ts` 中新增 `traySubtotal` Getter：計算每個托盤的金額小計
- [x] 2.3 在 `cart.ts` 中新增 `estimatedPoints` Getter：根據總金額計算本次預計獲得點數 (150/1)
- [x] 2.4 在 `cart.ts` 中新增 `redeemReward` Action：實作「扣除 10 點並將最貴餐點歸零」的邏輯

## 3. UI 介面呈現 (UI)

- [x] 3.1 修改 `Frontend/src/components/MealCard.vue`：在加入購物車按鈕旁顯示餐點售價
- [x] 3.2 修改 `Frontend/src/components/TraySelector.vue`：在托盤分頁標籤顯示該托盤的小計金額
- [x] 3.3 修改 `Frontend/src/views/CheckoutView.vue`：加入會員手機輸入框與現有點數顯示
- [x] 3.4 在 `CheckoutView.vue` 加入「兌換免費餐點」按鈕（僅在點數 >= 10 時顯示）
- [x] 3.5 在 `CheckoutView.vue` 底部摘要加入「本次預計獲得點數」的提示資訊

## 4. 結帳成功動畫與回饋 (Success Flow)

- [x] 4.1 修改 `Frontend/src/views/SuccessView.vue`：建立「印章卡」視覺元件
- [x] 4.2 在 `SuccessView.vue` 實作步進式的點數增加動畫（蓋章音效感與 Bouncy 效果）
- [x] 4.3 確保動畫風格配色符合 Material 3 規範，並使用專案主色調

## 5. 整合與驗證 (Verification)

- [x] 5.1 測試「滿額積點」邏輯：驗證 $300 是否正確給予 2 點
- [x] 5.2 測試「點數兌換」邏輯：驗證最貴餐點是否正確免單且扣除 10 點
- [x] 5.3 測試「身分保留」：驗證重新整理頁面後，手機號碼與點數是否仍存在
