# Trivia Visualization Dashboard

Interactive data visualization dashboard for exploring questions from
the [Open Trivia Database API](https://opentdb.com/).
The tool provides visual analytics of trivia questions distribution by categories and difficulty levels with interactive
filtering capabilities.

![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-7.1.7-purple)
![npm](https://img.shields.io/npm/v/recharts?label=Recharts)

## Features

- **Main Distribution Chart**: visualize question distribution across categories
- **Detailed Breakdown**: difficulty levels all and for selected category
- **Interactive Selection**: click on chart slices or use dropdown to filter data by categories

## Architecture

### Providers

- `AccessibilityProvider` - manages accessibility settings throughout the application

### Components

- [Dashboard.tsx](src/components/Dashboard/Dashboard.tsx) - main component with data fetching and visualization
- [MainChart.tsx](src/components/MainChart/MainChart.tsx) - main `BarChart` by category (or by provided main slice
  selector - `mainSliceFieldSelector`)
- [DetailsBySliceChart.tsx](src/components/DetailsBySliceChart/DetailsBySliceChart.tsx) - wrapper with information about
  selected slice around `DetailsChart`
- [DetailsChart.tsx](src/components/DetailsChart/DetailsChart.tsx) - `PieChart` visualizations by difficulty (or by
  provided details selector - `detailedSelector`)
- [MainSliceSelection.tsx](src/components/MainSliceSelection/MainSliceSelection.tsx) - selection dropdown for main slice
- [Header.tsx](src/components/Header/Header.tsx) - application header
- [Loader.tsx](src/components/Loader/Loader.tsx)- loading state display
- [FetchErrorMessage.tsx](src/components/FetchErrorMessage/FetchErrorMessage.tsx) - error state for data loading
- [VisuallyHidden.tsx](src/components/VisuallyHidden/VisuallyHidden.tsx) - accessibility helper component

## App configuration

Properties of [App.tsx](src/App.tsx).

`@property {AppConfig} [appConfig]`: application configuration settings. Defaults to `defaultAppConfig` (
see [AppConfig.ts](src/AppConfig.ts)) if not provided.

`@property {DataItem[]} [data]`: array of data to display. If provided, the app will use this data instead of fetching
from API (see [DataItem.ts](src/api/TriviaApi.ts)).

## API Integration

If data isn't provided, the application uses data from an external trivia API (
see [TriviaApi.ts](src/api/TriviaApi.ts)).
API configuration can be found in [ApiConfig.ts](src/api/ApiConfig.ts).

## Integration challenges

Keeping in mind the technical requirements and possibility of further integration into larger code base, I tried to expose this solution as a configurable component.

### ***How***

The component should be extracted as a standalone package that exports the main part and can be used as-is in any React application. The package would handle all visualization logic internally while accepting data and configuration through props.

### ***Key challenges***

1. **Code standardization**  
   All code needs to be aligned with the standards of the target codebase.

2. **Testing infrastructure**  
   The component needs comprehensive test coverage (unit and integration tests).

3. **Scalability**  
   The current implementation assumes moderate data variance (10-20 categories, 3-5 difficulty levels). Consider additional testing for large data sets performance.

4. **UI consistency**  
   No design system integration exists. The component needs theming support (colors, fonts etc.) to match host application styles.

### **Summary**

To integrate, this component needs to be made more abstract, the logic for receiving and cleaning data needs to be removed from it, and support for IDs and configurability of styles needs to be added.