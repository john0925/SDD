# Tasks: Static Meal Catalog

## 階段 1：基礎架構準備
- [x] 初始化 .NET 8 Web API 專案。
- [x] 初始化 Vue 3 專案 (使用 Vite, TypeScript)。
- [x] 配置 Tailwind CSS 並匯入 `Layout/code.html` 中的 Design Tokens。
- [x] 建立 `App_Data/meals.json` 並填入測試資料。

## 階段 2：後端 API 開發
- [x] 定義 `Meal` 與 `Nutrition` DTOs。
- [x] 實作讀取 JSON 檔案的資料服務。
- [x] 建立 `GET /api/meals` 端點並支援類別過濾。

## 階段 3：前端組件開發
- [x] 建立 `Layout` 組件 (NavBar, BottomBar)。
- [x] 建立 `MealCard` 組件：
    - [x] 實作高品質圖片展示 (含 Hover 縮放效果)。
    - [x] 實作營養數據標籤 (蛋白質、碳水、脂肪)。
    - [x] 實作熱量徽章 (kcal)。
- [x] 建立 `FilterBar` 組件並串接篩選邏輯。

## 階段 4：頁面整合與磨光
- [x] 整合 Home 頁面，確保響應式佈局 (Mobile/Desktop)。
- [x] 套用 `DESIGN.md` 中的「分層深度」與「磨砂玻璃」效果。
- [x] 驗證所有營養數據顯示的正確性。
