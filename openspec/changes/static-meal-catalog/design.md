# Design: Static Meal Catalog

## 1. 架構概述
採用前後端分離架構。後端提供 JSON 資料驅動的 API，前端使用 Vue 3 進行聲明式渲染。

## 2. 前端設計 (Vue 3 + Tailwind CSS)
### 2.1 Tailwind Config
需將 `Layout/code.html` 中的顏色主題整合進專案：
- `surface`: `#fbfaf1`
- `primary`: `#3e5219`
- `tertiary-container`: `#9c4f00` (營養標籤用)

### 2.2 組件階層
- `App.vue`
  - `TopNavBar` (玻璃擬態效果)
  - `HomeView`
    - `EditorialHeader` ( Hero 區塊)
    - `FilterBar` (碳水分類篩選)
    - `MealGrid`
      - `MealCard` (實作不對稱佈局與營養標示)
  - `BottomNavBar` (行動版導覽)

## 3. 後端設計 (.NET 8 Minimal API)
### 3.1 Endpoint
- `GET /api/meals`
  - 返回餐點列表。
  - 實作簡單的 `?category=low` 查詢參數過濾邏輯。

### 3.2 資料存取
- 建立 `MealDataService` 讀取 `App_Data/meals.json`。
- 使用 `System.Text.Json` 進行序列化，並開啟 `PropertyNameCaseInsensitive = true`。

## 4. 視覺實現細節
### 4.1 無邊框規則
- 使用 Tailwind 的 `bg-surface-container-low` 與 `bg-surface-container-lowest` 的對比來定義區塊，而非 `border`。
### 4.2 字體應用
- 標題：`Plus Jakarta Sans`
- 數據與內文：`Inter`
