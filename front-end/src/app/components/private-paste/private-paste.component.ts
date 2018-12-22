import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { map } from 'rxjs/operators';
import { PasteService } from '../../services/paste.service';
import { Paste } from '../../models/paste';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-private-paste',
  templateUrl: './private-paste.component.html',
  styleUrls: ['./private-paste.component.css']
})
export class PrivatePasteComponent  {

  paste: any;

  exposureOptions =[
    {value: 'public', text: 'public'},
    {value: 'private', text: 'private'}
  ];

  constructor(
    private pasteService: PasteService,
    private router: Router, 
    private route: ActivatedRoute,
    private alertService: FlashMessagesService
  ) { 
    this.route.params.subscribe(params => {
      this.getPaste(params['id'],params['uuid']);
    })

  }

  getPaste(id: number,paste_uuid: string){
    this.pasteService.getPrivatePaste(id,paste_uuid).subscribe(
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
          this.getPaste(0,uuid);
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
          if (result.status == 200 && (result.data.exposure == "private")){
            this.alertService.show('Paste has been updated',{cssClass:'alert-success', timeout: 5000}); 
            this.router.navigate(['/paste',result.data.id,result.data.private_uuid]);           
          }else if(result.status == 200 && (result.data.exposure == "public")){
             this.alertService.show('Paste has been updated',{cssClass:'alert-success', timeout: 5000});
             this.router.navigate(['/paste',result.data.uuid]); 
          }
    });
  }

}
