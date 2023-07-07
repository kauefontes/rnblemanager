import { useMemo, useState } from 'react';
import { BleManager, Device } from 'react-native-ble-plx';

interface BluetoothLowEnergyApi {
  scanForDevices(): Device[];
}

function useBle(): BluetoothLowEnergyApi {
  const bleManager = useMemo(() => new BleManager(), []);
  const [devices, setDevices] = useState<Device[]>([]);

  const scanForDevices = async () => {
    bleManager.startDeviceScan(
      null,
      {
        allowDuplicates: false,
      },
      async (error, device) => {
        console.log('Scanning...');
        if (error) {
          bleManager.stopDeviceScan();
        }
        console.log(device?.localName, device?.name);
        if (device?.localName == 'Edifier' || device?.name == 'Edifier') {
          setDevices([...devices, device]);
          bleManager.stopDeviceScan();
        }
      },
    );
  };
}

export default useBle;
