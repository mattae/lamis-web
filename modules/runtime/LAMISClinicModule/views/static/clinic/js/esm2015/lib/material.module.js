/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as tslib_1 from "tslib";
import {NgModule} from '@angular/core';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatOptionModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
} from '@angular/material';

export function modules() {
    return [
        MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule,
        MatChipsModule, MatDatepickerModule, MatDialogModule, MatGridListModule, MatIconModule,
        MatInputModule, MatListModule, MatNativeDateModule, MatOptionModule, MatProgressSpinnerModule, MatRadioModule,
        MatRippleModule, MatSelectModule, MatSlideToggleModule, MatTableModule, MatTabsModule,
        MatMenuModule, MatProgressBarModule, MatSidenavModule, MatSnackBarModule, MatToolbarModule,
        MatTooltipModule, MatDatetimepickerModule, MatNativeDatetimeModule
    ];
}

let MaterialModule = class MaterialModule {
};
MaterialModule = tslib_1.__decorate([
    NgModule({
        imports: modules(),
        exports: modules()
    })
], MaterialModule);
export {MaterialModule};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGFtaXMtY2xpbmljLTEuMS4zLyIsInNvdXJjZXMiOlsibGliL21hdGVyaWFsLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7O0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUU1RixPQUFPLEVBQ0gscUJBQXFCLEVBQ3JCLGVBQWUsRUFDZixhQUFhLEVBQ2IsaUJBQWlCLEVBQ2pCLGNBQWMsRUFDZCxtQkFBbUIsRUFDbkIsZUFBZSxFQUNmLGlCQUFpQixFQUNqQixhQUFhLEVBQ2IsY0FBYyxFQUNkLGFBQWEsRUFDYixhQUFhLEVBQ2IsbUJBQW1CLEVBQ25CLGVBQWUsRUFDZixvQkFBb0IsRUFDcEIsd0JBQXdCLEVBQ3hCLGNBQWMsRUFDZCxlQUFlLEVBQ2YsZUFBZSxFQUNmLGdCQUFnQixFQUNoQixvQkFBb0IsRUFDcEIsaUJBQWlCLEVBQ2pCLGNBQWMsRUFDZCxhQUFhLEVBQ2IsZ0JBQWdCLEVBQ2hCLGdCQUFnQixFQUNuQixNQUFNLG1CQUFtQixDQUFDO0FBRTNCLE1BQU0sVUFBVSxPQUFPO0lBQ25CLE9BQU87UUFDSCxxQkFBcUIsRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLGlCQUFpQjtRQUN4RSxjQUFjLEVBQUUsbUJBQW1CLEVBQUUsZUFBZSxFQUFFLGlCQUFpQixFQUFFLGFBQWE7UUFDdEYsY0FBYyxFQUFFLGFBQWEsRUFBRSxtQkFBbUIsRUFBRSxlQUFlLEVBQUUsd0JBQXdCLEVBQUUsY0FBYztRQUM3RyxlQUFlLEVBQUUsZUFBZSxFQUFFLG9CQUFvQixFQUFFLGNBQWMsRUFBRSxhQUFhO1FBQ3JGLGFBQWEsRUFBRSxvQkFBb0IsRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0I7UUFDMUYsZ0JBQWdCLEVBQUUsdUJBQXVCLEVBQUUsdUJBQXVCO0tBQ3JFLENBQUM7QUFDTixDQUFDO0FBTUQsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztDQUMxQixDQUFBO0FBRFksY0FBYztJQUoxQixRQUFRLENBQUM7UUFDTixPQUFPLEVBQUUsT0FBTyxFQUFFO1FBQ2xCLE9BQU8sRUFBRSxPQUFPLEVBQUU7S0FDckIsQ0FBQztHQUNXLGNBQWMsQ0FDMUI7U0FEWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgQWxmcmVzY28gU29mdHdhcmUsIEx0ZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdERhdGV0aW1lcGlja2VyTW9kdWxlLCBNYXROYXRpdmVEYXRldGltZU1vZHVsZSB9IGZyb20gJ0BtYXQtZGF0ZXRpbWVwaWNrZXIvY29yZSc7XG5cbmltcG9ydCB7XG4gICAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRDYXJkTW9kdWxlLFxuICAgIE1hdENoZWNrYm94TW9kdWxlLFxuICAgIE1hdENoaXBzTW9kdWxlLFxuICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsXG4gICAgTWF0RGlhbG9nTW9kdWxlLFxuICAgIE1hdEdyaWRMaXN0TW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgTWF0TGlzdE1vZHVsZSxcbiAgICBNYXRNZW51TW9kdWxlLFxuICAgIE1hdE5hdGl2ZURhdGVNb2R1bGUsXG4gICAgTWF0T3B0aW9uTW9kdWxlLFxuICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxuICAgIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSxcbiAgICBNYXRSYWRpb01vZHVsZSxcbiAgICBNYXRSaXBwbGVNb2R1bGUsXG4gICAgTWF0U2VsZWN0TW9kdWxlLFxuICAgIE1hdFNpZGVuYXZNb2R1bGUsXG4gICAgTWF0U2xpZGVUb2dnbGVNb2R1bGUsXG4gICAgTWF0U25hY2tCYXJNb2R1bGUsXG4gICAgTWF0VGFibGVNb2R1bGUsXG4gICAgTWF0VGFic01vZHVsZSxcbiAgICBNYXRUb29sYmFyTW9kdWxlLFxuICAgIE1hdFRvb2x0aXBNb2R1bGVcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5leHBvcnQgZnVuY3Rpb24gbW9kdWxlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgICBNYXRBdXRvY29tcGxldGVNb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZSwgTWF0Q2FyZE1vZHVsZSwgTWF0Q2hlY2tib3hNb2R1bGUsXG4gICAgICAgIE1hdENoaXBzTW9kdWxlLCBNYXREYXRlcGlja2VyTW9kdWxlLCBNYXREaWFsb2dNb2R1bGUsIE1hdEdyaWRMaXN0TW9kdWxlLCBNYXRJY29uTW9kdWxlLFxuICAgICAgICBNYXRJbnB1dE1vZHVsZSwgTWF0TGlzdE1vZHVsZSwgTWF0TmF0aXZlRGF0ZU1vZHVsZSwgTWF0T3B0aW9uTW9kdWxlLCBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUsIE1hdFJhZGlvTW9kdWxlLFxuICAgICAgICBNYXRSaXBwbGVNb2R1bGUsIE1hdFNlbGVjdE1vZHVsZSwgTWF0U2xpZGVUb2dnbGVNb2R1bGUsIE1hdFRhYmxlTW9kdWxlLCBNYXRUYWJzTW9kdWxlLFxuICAgICAgICBNYXRNZW51TW9kdWxlLCBNYXRQcm9ncmVzc0Jhck1vZHVsZSwgTWF0U2lkZW5hdk1vZHVsZSwgTWF0U25hY2tCYXJNb2R1bGUsIE1hdFRvb2xiYXJNb2R1bGUsXG4gICAgICAgIE1hdFRvb2x0aXBNb2R1bGUsIE1hdERhdGV0aW1lcGlja2VyTW9kdWxlLCBNYXROYXRpdmVEYXRldGltZU1vZHVsZVxuICAgIF07XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogbW9kdWxlcygpLFxuICAgIGV4cG9ydHM6IG1vZHVsZXMoKVxufSlcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbE1vZHVsZSB7XG59XG4iXX0=
