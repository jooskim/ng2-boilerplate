import {Component, OnInit} from 'angular2/core';

require('../assets/main.scss');

@Component({
	selector: 'app',
	template: `
		<h3>Angular 2 w/ Webpack</h3>
	`
})

export class AppComponent implements OnInit {
	ngOnInit(): any {
		console.log('init', ENV);
	}
}