/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  'main': 'main.js',

  '@angular/core': 'vendor/@angular/core/bundles/core.umd.js',
  '@angular/common': 'vendor/@angular/common/bundles/common.umd.js',
  '@angular/compiler': 'vendor/@angular/compiler/bundles/compiler.umd.js',
  '@angular/platform-browser': 'vendor/@angular/platform-browser/bundles/platform-browser.umd.js',
  '@angular/platform-browser-dynamic':
    'vendor/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
  '@angular/http': 'vendor/@angular/http/bundles/http.umd.js',
  '@angular/router': 'vendor/@angular/router/bundles/router.umd.js',
  '@angular/forms': 'vendor/@angular/forms/bundles/forms.umd.js',

  '@angular/material': 'vendor/@angular/material/bundles/material.umd.js'
};

/** User packages configuration. */
const packages: any = {
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // App specific barrels.
  'app',
  'app/shared',
  'app/+login',
  'app/+main/+customers',
  'app/+main/+accounts',
  'app/+main/+home',
  'app/+main/+help',
  'app/+main/+about',
  'app/+main'
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {
};

// add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index', defaultExtension: 'js' };
});


cliSystemConfigPackages['rxjs'] = { defaultExtension: 'js' };
cliSystemConfigPackages['moment'] = { main: 'moment' };
cliSystemConfigPackages['jquery'] = { main: 'dist/jquery.min' };
cliSystemConfigPackages['jquery-ui'] = { main: 'ui/widgets/datepicker' };
cliSystemConfigPackages['lodash'] = { main: 'lodash' };
cliSystemConfigPackages['datatables.net'] = { main: 'js/jquery.dataTables' };
cliSystemConfigPackages['datatables.net-buttons'] = { main: 'js/dataTables.buttons' };
cliSystemConfigPackages['datatables.net-colreorder'] = { main: 'js/dataTables.colReorder' };
cliSystemConfigPackages['datatables.net-select'] = { main: 'js/dataTables.select' };
cliSystemConfigPackages['colresizable'] = { main: 'colResizable-1.6.min' };
cliSystemConfigPackages['pdfmake'] = { main: 'build/pdfmake.min' };
cliSystemConfigPackages['ng2-translate'] = {
  main: 'bundles/ng2-translate.umd.js', defaultExtension: 'js'
};
cliSystemConfigPackages['ontimize-web-ng2'] = { main: 'ontimize' };

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    'rxjs': 'vendor/rxjs',
    'moment': 'vendor/moment',
    'jquery': 'vendor/jquery',
    'jquery-ui': 'vendor/jquery-ui',
    'lodash': 'vendor/lodash',
    'datatables.net': 'vendor/datatables.net',
    'datatables.net-buttons': 'vendor/datatables.net-buttons',
    'datatables.net-colreorder': 'vendor/datatables.net-colreorder',
    'datatables.net-select': 'vendor/datatables.net-select',
    'colresizable': 'vendor/colresizable',
    'pdfmake': 'vendor/pdfmake',
    'ng2-translate': 'vendor/ng2-translate',
    'ontimize-web-ng2': 'vendor/ontimize-web-ng2'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
