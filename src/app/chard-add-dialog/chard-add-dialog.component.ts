import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-chard-add-dialog',
  templateUrl: './chard-add-dialog.component.html',
  styleUrls: ['./chard-add-dialog.component.scss']
})
export class ChardAddDialogComponent implements OnInit {
  public form = new FormGroup({
    title: new FormControl('', Validators.compose([Validators.required])),
    measures: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false)]),
    charts: new FormArray([
      new FormControl('column'),
      new FormControl('column'),
      new FormControl('column')])
  });
  public chartTypes = ['column', 'line'];
  public measureTypes = [
    {name: 'temperature', key: 'temp_c'},
    {name: 'humidity', key: 'humidity'},
    {name: 'wind', key: 'wind_kph'}
  ];
  public colors = ['#058DC7', '#6AF9C4', '#ED561B'];

  constructor(
    public dialogRef: MatDialogRef<ChardAddDialogComponent>) {
  }

  get title() {
    return this.form.get('title');
  }

  get measures() {
    return (this.form.controls.measures as FormArray).controls;
  }

  get charts() {
    return (this.form.controls.charts as FormArray).controls;
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (!this.validateMeasures()) {
      alert('Please choose at least one measure');
      return;
    } else {
      const newChart = {
        title: this.form.value.title,
        chartData: this.form.value.measures.map((checked, i) => {
          if (checked) {
            return {
              type: this.form.value.charts[i],
              measure: {
                name: this.measureTypes[i].name,
                key: this.measureTypes[i].key
              },
              color: this.colors[i]
            };
          }
        }).filter(measure => !!measure)
      };
      this.dialogRef.close(newChart);
    }
  }

  validateMeasures() {
    return this.form.value.measures.indexOf(true) !== -1;
  }
}
