import {
  Component, AfterViewInit, ChangeDetectorRef,
} from '@angular/core';
import { IDataAddress } from 'green-controls/src/interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IMockAddress } from './interface/mock-address.interface';
import { MockAddress } from './const/mock.address.const';
import { dataAddressHouseHome, dataAddressHouseReg } from './const/house.const';

@Component({
  selector: 'app-form-address',
  templateUrl: './form-address.component.html',
  styleUrls: [ './form-address.component.scss' ],
})
export class FormAddressComponent implements AfterViewInit {
  public form!: FormGroup;

  public mockAddress: IMockAddress[] = MockAddress;

  public isRequiredFlat: boolean = false;

  public isRequiredFlat2: boolean = false;

  public isShow: boolean = true;

  public dataReg = dataAddressHouseReg;

  public dataHouse = dataAddressHouseHome;

  constructor(private readonly _fb: FormBuilder, private readonly _cdr: ChangeDetectorRef) {
    this.form = this._fb.group({
      address: this._fb.control(''),
      check: this._fb.control(true),
      address2: this._fb.control(''),
      check2: this._fb.control(false),
    });
  }

  ngAfterViewInit(): void {
    this.isRequiredFlat = this.form.get('check')?.value;
    this._cdr.detectChanges();

    this.form.get('check')?.valueChanges.subscribe((v) => {
      this.isRequiredFlat = v;
    });

    this.isRequiredFlat2 = this.form.get('check2')?.value;

    this.form.get('check2')?.valueChanges.subscribe((v) => {
      this.isRequiredFlat2 = v;
    });
    this._cdr.detectChanges();
  }

  public dataAddrress: IDataAddress<IMockAddress, IMockAddress, IMockAddress > = {
    region: {
      displayFn: (item) => item.name,
      valuesAutoComplete: [],
      valueOnDisplay: 'name',
      label: 'region',
      validators: [ Validators.required ],
    },
    city: {
      displayFn: (item) => item.name,
      valuesAutoComplete: [],
      valueOnDisplay: 'name',
      label: 'city',
      validators: [ Validators.required ],
    },
    street: {
      displayFn: (item) => item.name,
      valuesAutoComplete: [],
      valueOnDisplay: 'name',
      label: 'street',
      validators: [ Validators.required ],
    },
  };

  public changeRegion(value: unknown): void {
    if (typeof value === 'string' && value) {
      this.dataAddrress.region.valuesAutoComplete = this.mockAddress.filter((mockAddress) => mockAddress.name.includes(value));
      this.dataAddrress = { ...this.dataAddrress };
    } else {
      this.dataAddrress.region.valuesAutoComplete = [];
      this.dataAddrress = { ...this.dataAddrress };
    }
  }

  public changeCity(value: unknown): void {
    if (typeof value === 'string' && value) {
      this.dataAddrress.city.valuesAutoComplete = this.mockAddress;
      this.dataAddrress = { ...this.dataAddrress };
    } else {
      this.dataAddrress.city.valuesAutoComplete = [];
      this.dataAddrress = { ...this.dataAddrress };
    }
  }

  public changeStreet(value: unknown): void {
    if (typeof value === 'string' && value) {
      this.dataAddrress.street.valuesAutoComplete = this.mockAddress;
      this.dataAddrress = { ...this.dataAddrress };
    } else {
      this.dataAddrress.street.valuesAutoComplete = [];
      this.dataAddrress = { ...this.dataAddrress };
    }
  }

  public hide(): void {
    this.isShow = !this.isShow;
  }

  public onSubmit(): void {
    console.log(this.form.valid);
  }
}
