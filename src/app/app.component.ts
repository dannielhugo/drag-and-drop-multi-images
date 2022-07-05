import { CdkDragDrop, CdkDragEnter, CdkDragExit } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

interface Item {
  id: number;
  src: string;
  selected: boolean;
  temp?: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items: Array<Item> = [
    { id: 1, selected: false, src: 'https://assets.hongkiat.com/uploads/ps3-game-covers/Aliens-vs-Predator.jpg' },
    { id: 2, selected: false, src: 'https://cdn.tutsplus.com/cdn-cgi/image/width=600/psd/uploads/legacy/psdtutsarticles/linkb_60vgamecovers/35.jpg' },
    { id: 3, selected: false, src: 'http://cdn.themis-media.com/media/global/images/library/deriv/895/895235.jpg' },
    { id: 4, selected: false, src: 'https://cdn.tutsplus.com/cdn-cgi/image/width=600/psd/uploads/legacy/psdtutsarticles/linkb_60vgamecovers/38.jpg' },
    { id: 5, selected: false, src: 'https://i.pinimg.com/originals/7e/6d/f3/7e6df30ee7eef611eb7a87dc2e767098.jpg' },
    { id: 6, selected: false, src: 'https://www.oxpal.com/wp-content/uploads/2014/08/far_cry_3_-_cover.jpg' },
    { id: 7, selected: false, src: 'https://cdn.tutsplus.com/cdn-cgi/image/width=600/psd/uploads/legacy/psdtutsarticles/linkb_60vgamecovers/42.jpg' },
    { id: 8, selected: false, src: 'https://www.psu.com/wp/wp-content/uploads/2020/09/all-ps5-box-art-every-ps5-game-cover-11.jpg' },
    { id: 9, selected: false, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT7CF2OWAUM409Pwx27Iy4q-6S8XhMtnAReQ&usqp=CAU' },
    { id: 10, selected: false, src: 'https://oyster.ignimgs.com/wordpress/stg.ign.com/2012/12/Dishonored.jpg' }
  ];

  selected: Array<Item> = [];

  onSelect(image: Item, event: MouseEvent) {
    if (event.ctrlKey) {
      const has = this.selected.find((img) => img.id === image.id);
      const id = this.items.findIndex((img) => img.id === image.id);

      if (!has) {
        this.items[id].selected = true;
        this.selected.push(image);
      } else{
        this.items[id].selected = false;
        this.selected = this.selected.filter((img) => img.id !== image.id);
      }
    }
  }

  onDropFile(event: CdkDragDrop<Item[]>) {
    const item = event.item.data;

    // Mult select is not in progress
    if (!this.selected.length) {
      this.items = this.items.filter((img) => img.id !== item.id);
    }

    // Mult select in progress
    if (this.selected.length > 1) {
      const ids = this.selected.map(img => img.id);

      this.items = this.items.filter((img) => !ids.includes(img.id));
      this.selected = [];
    }

    // Remove any temporary item from items list when drop finishes
    if (event.previousContainer.data) {
      this.items = this.items.filter((f) => !f.temp);
    }
  }

  /**
   * The functions below are used to not remove the dragged item from its original list
   * when drag&drop is in progress
   */
  noReturnPredicate() {
    return false;
  }

  onSourceListExited(event: CdkDragExit) {
    const currentIdx = event.container.data.findIndex(
      (f: Item) => f.id === event.item.data.id
    );

    // Re-add the item being moved to its original list as an temporary item
    this.items.splice(currentIdx + 1, 0, {
      ...event.item.data,
      temp: true,
    });
  }

  onSourceListEntered(_: CdkDragEnter) {
    this.items = this.items.filter((f) => !f.temp);
  }

  onSourceListDropped(event: any) {
    if (event.previousContainer.data) {
      this.items = this.items.filter((f) => !f.temp);
    }
  }
}
