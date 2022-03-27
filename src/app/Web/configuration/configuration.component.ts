import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ConfigurationService} from "../../services/configuration.service";

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  constructor(public config: ConfigurationService) { }

  ngOnInit(): void {
    this.config.getConfiguration();
  }
  onSubmit(f: NgForm): void{}
}
