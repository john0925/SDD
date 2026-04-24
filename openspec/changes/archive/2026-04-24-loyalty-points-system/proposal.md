## Why

透過實作會員制度與積點兌換機制，提升使用者對健康餐飲平台的黏著度與回購率。讓使用者在關注營養分析的同時，也能享有具體的消費獎勵。

## What Changes

- **餐點定價策略更新**：為所有餐點加入售價，並調整所有價格至 200 元以下，以符合「健康且實惠」的品牌定位。
- **會員積點機制**：實作「滿 150 元積 1 點」的邏輯，積點累計至 10 點可兌換任一免費餐點。
- **購物車與托盤介面強化**：在 `MealCard` 顯示售價，並在「托盤切換」與「結帳頁面」顯示小計、總額與預計獲得點數。
- **結帳成功動畫**：在成功頁面加入活潑、具備 M3 風格的集點動畫，以「印章卡」形式提供視覺回饋。

## Capabilities

### New Capabilities
- `member-loyalty`: 定義會員身分識別、點數累積演算法（150/1）以及兌換門檻（10點兌換任一餐點）。

### Modified Capabilities
- `meal-catalog`: 修改餐點模型以支援售價屬性，並在介面呈現價格。
- `order-checkout`: 修改結帳流程，整合會員資訊、點數套用邏輯，以及計算最終實付金額。
- `tray-management`: 在托盤管理中加入金額統計邏輯，支援分人分單小計。

## Impact

- **Frontend (Vue)**: `cart.ts` store, `MealCard.vue`, `TraySelector.vue`, `CheckoutView.vue`, `SuccessView.vue`。
- **Backend (.NET)**: `Meal` Model (Price 屬性), `meals.json` 資料更新, `OrderRequest` 擴充會員資訊。
- **Data**: 需要對 `meals.json` 進行批次價格調整。
