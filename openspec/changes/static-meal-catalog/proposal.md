# Change Proposal: Static Meal Catalog

## 1. 目標
建立「健康日常」靜態原型頁面，落實 .NET 8 與 Vue 3 的技術整合，並完美還原 Google Stich 的設計規範。

## 2. 範疇 (Scope)
- **前端 (Vue 3)**：
  - 實作符合 `DESIGN.md` 的 Tailwind CSS 配置。
  - 開發 `MealCard`, `FilterBar`, `EditorialHeader` 等核心組件。
  - 建立靜態首頁與商品列表頁。
- **後端 (.NET 8)**：
  - 使用 Minimal APIs 建立基礎架構。
  - 實作 `GET /api/meals` 介面，讀取 JSON 資料。
- **資料 (Data)**：
  - 準備包含精確營養數據的 `meals.json`。

## 3. 非範疇 (Out of Scope)
- SQL Server 資料庫整合 (留待下一階段)。
- 使用者登入與會員點數系統實作。
- 實際的購物車結帳邏輯 (僅保留 UI 狀態)。

## 4. 成功指標
- 頁面視覺與 `Layout/screen.png` 保持一致。
- 點擊篩選器 (Filter) 能正確過濾餐點列表。
- 營養標示數據能正確從後端 API 取得並呈現。
