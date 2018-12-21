import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { map } from 'rxjs/operators';
import { PasteService } from '../../services/paste.service';
import { Paste } from '../../models/paste';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-show-paste',
  templateUrl: './show-paste.component.html',
  styleUrls: ['./show-paste.component.css']
})
export class ShowPasteComponent {

  paste: any;

  constructor(
    private pasteService: PasteService,
    private router: Router, 
    private route: ActivatedRoute,
    private alertService: FlashMessagesService
  ) 
  { 
    this.route.params.subscribe(params => {
      this.getPaste(params['uuid']);
    })

  }



  getPaste(paste_uuid: string){
    this.pasteService.getByUUID(paste_uuid).subscribe(
      result =>{
        if(result.status == 200){
          this.paste = result.data;
        }else if(result.status == 404){
          this.router.navigate(['/home']);
        }
      },
        error => {
          console.log(error);
      });
  }

  onDeletePaste(uuid: string){
  if(window.confirm('Are sure you want to delete paste '+ uuid +'?') == true){
    this.pasteService.delPaste(uuid).subscribe(
      result => {
        if(result.status == 200){
          this.alertService.show(result.msg,{cssClass:'alert-danger', timeout: 5000});
          this.getPaste(uuid);
          }
        },
        error => {
          console.log(error);
        }
       );
    }
  }


  saveEditable(value,uuid,attribute) {
    this.pasteService.editPaste(uuid,value,attribute).subscribe(
        result => {
          if (result.status == 200){
            this.alertService.show(`Paste ${uuid} has been updated`,{cssClass:'alert-success', timeout: 5000});
          }
    });
  }
}
