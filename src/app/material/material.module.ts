import {NgModule} from '@angular/core';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule, MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule, MatSnackBarModule, MatSortModule,
  MatStepperModule, MatTableModule,
  MatTabsModule,
  MatToolbarModule, MatTooltipModule
} from '@angular/material';


const materialModules = [
  MatCheckboxModule,
  MatInputModule,
  MatSelectModule,
  MatRadioModule,
  MatMenuModule,
  MatToolbarModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatTabsModule,
  MatButtonModule,
  MatChipsModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatDialogModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatSlideToggleModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatAutocompleteModule,
  MatExpansionModule,
  MatButtonToggleModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatSidenavModule,
  MatSliderModule,
  MatStepperModule,
  MatNativeDateModule
];

@NgModule({
  imports: materialModules,
  exports: materialModules
})
export class MaterialModule {
}
