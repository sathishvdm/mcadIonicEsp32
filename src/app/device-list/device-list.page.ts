import { Component, OnInit, NgZone } from '@angular/core';

//ble
import { BLE } from "@ionic-native/ble/ngx";
//Toast
import { ToastController } from "@ionic/angular";
//for loading
import { LoadingController } from "@ionic/angular";
//Navigation
import { NavController } from "@ionic/angular";
//for alert
import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";

//accessing bluetooth hardware
import { Diagnostic } from "@ionic-native/diagnostic/ngx";

//service for passing data to main page
import { DeviceInfoService } from '../services/device-info.service';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.page.html',
  styleUrls: ['./device-list.page.scss'],
})
export class DeviceListPage implements OnInit {

  devices: any[] = [];
  statusMessage: string;
  stringBuilder: any;
  loading: any;

  constructor( public navCtrl: NavController,
    private toastCtrl: ToastController,
    public loadCtrl: LoadingController,
    private alertCtrl: AlertController,
    private diagnostic: Diagnostic,
    private ble: BLE,
    private ngZone: NgZone,
    private route: Router,
    private deviceInfoservice: DeviceInfoService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter");
    // this.checkBluetooth();
  }

  //check bluetooth
  checkBluetooth() {
    this.diagnostic.isBluetoothAvailable().then(
      () => {
        this.diagnostic.getBluetoothState().then(state => {
          if (state == this.diagnostic.bluetoothState.POWERED_ON) {
            //for turning on location service
            // this.getlocation();
            this.scan();
          } else {
            this.setStatus("Bluetooth turned off.");
            this.showAlert("", "Please turn on your bluetooth!");
          }
        });
      },
      error => {
        this.showAlert("Warning.!", "Bluetooth service not available");
      }
    );
  }


  //scan bluetooth device.
  scan() {
    this.setStatus("Scanning for Bluetooth Devices");
    this.devices = []; // clear list
    this.presentLoading("please wait..");
    this.ble
      .scan([], 5)
      .subscribe(
        device => this.onDeviceDiscovered(device),
        error => this.scanError(error)
      );
    setTimeout(() => {
      this.setStatus("Scan Completed");
      this.dismissLoading();
    }, 5000);
  }


  onDeviceDiscovered(device) {
    console.log("Discovered " + JSON.stringify(device, null, 2));
    this.setStatus("Scan Completed");
    this.dismissLoading();
    this.ngZone.run(() => {
      //pushing the list of devices to array using (.push) method
      this.devices.push(device);
    });
  }

  // If location permission is denied, you'll end up here(error scanning)
  async scanError(error) {
    this.setStatus("" + error);
    let toast = await this.toastCtrl.create({
      message: "Turn on location from settings for better scanning..",
      position: "middle",
      duration: 2000
    });
    toast.present();
  }

  listConnect(device) {
    console.log("list item clicked: ", device);
    this.deviceInfoservice.deviceInfo = {
      name: device.name,
      id: device.id,
      rssi: device.rssi
    };
    this.route.navigateByUrl("/home/layout-main");
  }

  //Loading dialog
  private async presentLoading(showtxt: string) {
    this.loading = await this.loadCtrl.create({
      message: showtxt,
      spinner: "bubbles"
    });
    this.loading.present();
  }

  //dismiss dialog
  private dismissLoading() {
    if (this.loading) {
      this.loading.dismiss();
      this.loading = null;
    }
  }

  //status for the message
  setStatus(message) {
    console.log(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }

  //for alert
  async showAlert(title, message) {
    let alert = await this.alertCtrl.create({
      header: title,
      subHeader: message,
      buttons: ["OK"]
    });
    return await alert.present();
  }
}
