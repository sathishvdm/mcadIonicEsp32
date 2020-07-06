import { Component, OnInit, NgZone } from '@angular/core';
//ble
import { BLE } from "@ionic-native/ble/ngx";

//routing 
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";

//Navigation,navparameter,alert,toast,loading
import { NavController, AlertController, ToastController, LoadingController } from "@ionic/angular";
//service for getting data from home page
import { DeviceInfoService } from '../services/device-info.service';

// Bluetooth UUIDs
const _SERVICE = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
const _CHARACTERISTIC_READ = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';
const _CHARACTERISTIC_WRITE = '6e400002-b5a3-f393-e0a9-e50e24dcca9e';

@Component({
  selector: 'app-layout-main',
  templateUrl: './layout-main.page.html',
  styleUrls: ['./layout-main.page.scss'],
})
export class LayoutMainPage implements OnInit {

  peripheral: any = {};
  statusMessage: string;
  device: any = {};
  datasfromble: any;
  datatoscreen: any = "";
  lat: any;
  long: any;
  stringbuilder: any;
  device1: boolean = false;
  device2: boolean = false;

  constructor(public navCtrl: NavController,
    private ble: BLE,
    private alertCtrl: AlertController,
    private ngZone: NgZone,
    private route: Router,
    private deviceservice: DeviceInfoService) {
  }

  ngOnInit() {
    // This is not a promise, the device can call disconnect after it connects, so it's an observable
    this.ble.connect(this.deviceservice.deviceInfo.id).subscribe(
      peripheral => this.onConnected(peripheral),
      // peripheral => this.showAlert('Disconnected', 'The peripheral disconnected')
      peripheral => this.showAlert('Not able to connect.. ',peripheral)
    );
  }

  // the connection to the peripheral was successful
  onConnected(peripheral) {

    this.peripheral = peripheral;
    console.log(peripheral);
    this.setStatus('Connected to ' + (peripheral.name || peripheral.id));
  }

  //start to read from the bluetooth
  StartRead(): any {

    // Subscribe for notifications when the temperature changes
    this.ble.startNotification(this.peripheral.id, _SERVICE, _CHARACTERISTIC_READ).subscribe(
      (data) => this.onstatusChange(data),
      (data) => this.showAlert('Unexpected Error', 'Failed to get data.')
    );

    //to call stop method after certain amount of time
    // setTimeout(this.StopRead,10000);
  }

  onstatusChange(buffer: ArrayBuffer) {

    // Temperature is a 4 byte floating point value
    // var data = new Float32Array(buffer);
    let data = new Uint8Array(buffer);
    // console.log(data[0]);
    this.datatoscreen += String.fromCharCode.apply(null, data);
    this.stringbuilder += this.datatoscreen;
    console.log(this.datatoscreen);

    this.ngZone.run(() => {
      this.datasfromble = this.stringbuilder;
    });

  }

  writeBLE() {
    var ss = 1;
    var data = new Uint8Array([ss]).buffer;
    data[0] = 1;
    this.ble.write(this.peripheral.id, _SERVICE, _CHARACTERISTIC_WRITE, data).then()
  }

  //method to send to sever
  /*SendtoServer(){
    var data = "19";
    this.http.createPost(data).subscribe(response => {
      this.showAlert("successfully sent", response)
    },error =>{
      this.showAlert("Failed to send", error);
    })
  } */

  //stop the notifications or read from bluetooth
  StopRead(): any {

    this.ble.stopNotification(this.peripheral.id, _SERVICE, _CHARACTERISTIC_READ).then(() => {

      //write to file 

      //start to send server


    }).catch(() => {
      this.showAlert('Error!', 'Unable to stop.');
    })
  }



  // Disconnect peripheral when leaving the page
  ionViewWillLeave() {
    console.log('ionViewWillLeave disconnecting Bluetooth');
    this.ble.disconnect(this.peripheral.id).then(
      () => console.log('Disconnected ' + JSON.stringify(this.peripheral)),
      () => console.log('ERROR disconnecting ' + JSON.stringify(this.peripheral))
    )
  }


  async showAlert(title, message) {
    let alert = await this.alertCtrl.create({
      header: title,
      subHeader: message,
      buttons: [{
        text: 'OK',
        handler: () => {
          // console.log('');
          this.route.navigateByUrl("/home");
        }
      }]
    });
    return await alert.present();
  }

  setStatus(message) {
    console.log(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }




}
