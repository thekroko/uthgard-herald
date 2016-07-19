// SystemJS configuration file, see links for more information
// https://github.com/systemjs/systemjs
// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md

/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  'moment': 'vendor/moment/moment.js',
  'chartjs': 'vendor/chart.js/dist/Chart.min.js'
};

/** User packages configuration. */
const packages: any = {
  'moment': {
    format: 'cjs',
    defaultExtension: 'js'
  },
  'chartjs': {
    defaultExtension: 'js',
    format: 'global'
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/forms',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/shared',
  'app/+character-profile',
  'app/+home',
  'app/+character-profile/siege-stats',
  'app/+character-profile/recently-earned',
  'app/+character-profile/rvr-kills',
  'app/+character-profile/race-class-kills',
  'app/+character-profile/rp-rankings',
  'app/+character-profile/progress',
  'app/+character-profile/pve-kills',
  'app/+character-profile/tradeskills',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
