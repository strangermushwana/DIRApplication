import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public chosen = false;
  public empty = false;
  public details = false;
  public error = false;
  public details_dir = false;
  // public notext = false;
  dirs$: any = [];
  directory$: any = [];
  list_dir$: any = [];
  list_n_dir$: any = [];
  error_message$: string = "";


  constructor(private API: DataService) { }

  ngOnInit() {

  }

  public checkTwoDir(inputValue: string, extra: string) {

    this.checkDir(inputValue + extra);
  }

  public checkDir(inputValue: string) {
    if (inputValue === "") {
      // this.notext = true;
      alert("Input cannot be empty - Please enter a directory")
      this.empty = false;
      this.error = false;
      this.details_dir = false;
      this.details = false;
    } else {

      this.API.getData(inputValue).subscribe((data) => {

        this.dirs$ = data;
        this.directory$ = this.dirs$.directory.split("/");
        this.list_dir$ = this.dirs$.dirs;
        this.list_n_dir$ = this.dirs$.n_dir;

        // console.log(this.list_dir$)
        // console.log(this.list_n_dir$)
        // console.log(this.dirs$)

        this.chosen = true;
        if (this.dirs$.n_dir_size > 0) {
          this.details = true;
          this.error = false;
          this.empty = false;
          // this.notext = false;
        } if (this.dirs$.dir_size > 0) {
          this.details_dir = true;
          this.error = false;
          this.empty = false;
          // this.notext = false;
        } if (this.dirs$.failed === true) {
          this.error = true;
          this.details_dir = false;
          this.details = false;
          this.empty = false;
          // this.notext = false;
          this.error_message$ = this.dirs$.error;
        } if (this.dirs$.size === 0) {
          this.empty = true;
          this.error = false;
          this.details_dir = false;
          this.details = false;
          // this.notext = false;
        } if (this.dirs$.n_dir_size === 0 && this.dirs$.dir_size > 0) {
          this.details_dir = true;
          this.details = false;
          this.error = false;
          this.empty = false;
          // this.notext = false;
        } if (this.dirs$.dir_size === 0 && this.dirs$.n_dir_size > 0) {
          this.details_dir = false;
          this.details = true;
          this.error = false;
          this.empty = false;
          // this.notext = false;
        }
      })
    }
    inputValue = ""
  }
}
