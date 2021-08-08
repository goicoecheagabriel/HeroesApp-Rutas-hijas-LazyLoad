import { Component, Renderer2, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

// implementacion inspirada en el siguiente link
// https://stackoverflow.com/questions/60301866/implementing-ecwid-on-a-angular-8-application-with-script-tags

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styles: [
  ]
})
export class ViewComponent implements OnInit {
  constructor(private renderer2: Renderer2, @Inject(DOCUMENT) private document: Document) {}

  public ngOnInit() {
    const storeId:any = 54091005;
    const script = this.renderer2.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('charset', 'utf-8');
    script.setAttribute('data-cfasync', 'false');
    script.setAttribute('src', `https://app.ecwid.com/script.js?${storeId}&data_platform=code&data_date=2020-02-17`);
    script.onload = this.injectEcwidProductBrowser(storeId);

    this.renderer2.appendChild(this.document.getElementById('ecwidScriptsSection'), script);
  }

  private injectEcwidProductBrowser(storeId:any) {
    return () => {
      const ecwidBrowserScript = document.createElement('script');
      ecwidBrowserScript.setAttribute('type', 'text/javascript');
      ecwidBrowserScript.setAttribute('charset', 'utf-8');
      ecwidBrowserScript.text = `xProductBrowser("categoriesPerRow=3","views=grid(20,3) list(60) table(60)","categoryView=grid","searchView=list","id=my-store-${storeId}");`;
      document.head.appendChild(ecwidBrowserScript);
    };
  }
}