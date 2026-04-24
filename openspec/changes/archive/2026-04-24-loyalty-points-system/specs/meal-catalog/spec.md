## MODIFIED Requirements

### Requirement: 餐點列表展示
系統 SHALL 展示所有可用餐點。每個餐點需包含：名稱、描述、高品質圖片、熱量、三大營養素 (蛋白質、碳水、脂肪) 以及 **售價**。視覺需遵循「數位策展人」風格：無邊框設計、階層式背景色調。**價格應緊鄰「加入購物車」按鈕顯示。**

#### Scenario: 成功載入餐點列表與價格
- **WHEN** 使用者進入菜單頁面
- **THEN** 系統顯示所有餐點卡片及其營養資訊與售價

### Requirement: 基礎餐點資料模型
系統 SHALL 定義餐點的基礎資料結構，並 MUST 擴充以支援營養評分所需的標籤。**餐點結構必須包含 `Price` 欄位以支援結帳計算。**

| 屬性 | 說明 | 範例 |
| :--- | :--- | :--- |
| `ID` | 唯一識別碼 | `meal-001` |
| `Name` | 餐點名稱 | `嫩煎雞胸餐盒` |
| `Price` | 售價 | `180` |
| `CarbCategory` | 碳水分類 | `none`, `low`, `high` |
| `Calories` | 總熱量 | `450` |
| `Attributes` | 評分獎勵標籤 | `isNonRefinedStarch: true` |

#### Scenario: 驗證擴充欄位
- **WHEN** API 回傳餐點物件
- **THEN** 物件包含基礎欄位、`Price` 以及 `Attributes` (含 `IsNonRefinedStarch` 與 `HasDiverseVeg`)
