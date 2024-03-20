const {remote} = require('webdriverio');

const { exec, spawn } = require('node:child_process');

const { execSync } = require('child_process');
const os = require('os');

const setEnvVariable = (envName, envValue) => {
  try {
    if (os.platform() === 'win32') {
      execSync(`setx ${envName} "${envValue}"`);
    } else {
      execSync(`export ${envName}="${envValue}"`);
    }
    console.log(`已在系统中设置 ${envName}`);
  } catch (error) {
    console.error(`设置 ${envName} 时发生错误:`, error);
  }
};

if (!process.env.ANDROID_HOME) {
  console.log('ANDROID_HOME 环境变量不存在');
  // setEnvVariable('ANDROID_HOME', '/Users/lihao/Library/Android/sdk');
}

if (!process.env.ANDROID_SDK_ROOT) {
  console.log('ANDROID_SDK_ROOT 环境变量不存在');
  // TODO
  // setEnvVariable('ANDROID_SDK_ROOT', '/Users/lihao/Library/Android/sdk');
}

const capabilities = {
  'platformName': 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Android',
  'appium:appPackage': 'com.android.settings',
  'appium:appActivity': '.Settings',
};

const wdOpts = {
  hostname: process.env.APPIUM_HOST || 'localhost',
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
  logLevel: 'info',
  capabilities,
};

async function runTest() {
  const driver = await remote(wdOpts);
  try {
    const batteryItem = await driver.$('//*[@text="Battery"]');
    await batteryItem.click();
  } finally {
    await driver.pause(1000);
    await driver.deleteSession();
  }
}

runTest().catch(console.error);