## MODIFIED Requirements

### Requirement: Basic Meal Data Model
The system MUST extend the meal model to support attributes for nutrition scoring.

| Property | Description | Example |
| :--- | :--- | :--- |
| `ID` | Unique identifier | `meal-001` |
| `Name` | Meal name | `Grilled Chicken` |
| `Attributes` | Scoring reward tags | `isNonRefinedStarch: true` |

#### Scenario: Query meals with reward tags
- **WHEN** reading meal list API
- **THEN** returned objects MUST include `Attributes` field with `IsNonRefinedStarch` and `HasDiverseVeg` properties
