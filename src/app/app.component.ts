import { Component, HostListener, OnInit } from '@angular/core';

export interface Reply {
  author: string;
  description: string;
  type: string;
}

export interface Topic {
  title: string;
  description: string;
  author: string;
  answered: boolean;
  likes: number;
  replies: Reply[];
  open: boolean;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  createTopicForm = false;
  feedback = false;
  topics: Topic[] = [];
  topicTitle = '';
  topicDescription = '';
  topicAuthor = '';
  isEditing = false;
  topicSended = false;

  showMenuBtn = false;
  menuOpen: boolean = false;

  canGiveLike = true;

  firstParagraph = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur fringilla mauris tempor, auctor nibh sed, ullamcorper enim. Aenean congue erat id odio vehicula vulputate. Maecenas vel arcu id orci pulvinar luctus. Sed eget ipsum sed elit malesuada scelerisque.
  
  Donec ullamcorper massa ante, eu volutpat lectus interdum eget. Vestibulum vitae malesuada ipsum, non hendrerit arcu. Suspendisse at ipsum venenatis, imperdiet enim vitae, pharetra turpis. Morbi tincidunt commodo nisi. Aenean fringilla commodo hendrerit. Vivamus nec felis vel justo posuere convallis ac ut enim. Curabitur tortor ante, blandit quis dictum non, laoreet at dui. Praesent molestie magna et euismod faucibus. Quisque dapibus ante bibendum tellus facilisis tincidunt.`;

  remainingText = `Duis tincidunt purus efficitur turpis convallis, sed cursus arcu finibus. In faucibus neque eu nunc pretium mattis. Etiam bibendum tellus nunc, ut mattis mauris rhoncus vitae. Vestibulum a dignissim eros. Aliquam vitae consectetur turpis. Morbi et lacus finibus nibh tempus posuere. Vestibulum id rutrum diam, vitae dignissim tellus. Vivamus venenatis sem et mauris accumsan, vitae molestie diam fermentum. Aliquam lobortis porttitor mi ut suscipit. Proin metus ipsum, fringilla interdum lorem vitae, pharetra venenatis tellus. In pellentesque, est a sodales consequat, leo quam laoreet velit, scelerisque convallis nulla ex sed quam. Aenean elit orci, aliquam a est ut, rhoncus gravida augue. Quisque hendrerit libero id diam pharetra, et posuere erat egestas. Morbi in sodales nibh. Suspendisse vitae elementum ante.
  
  Vestibulum sollicitudin vel felis eu facilisis. Morbi vel viverra urna. Morbi porta odio sed turpis lacinia hendrerit. Vestibulum eleifend ac arcu sed sagittis. Donec quis arcu ex. Etiam vulputate vel ipsum at dapibus. Aenean ultrices id nulla vel congue. Praesent vitae justo consectetur, tristique metus in, sagittis arcu. Ut eu purus sollicitudin, ullamcorper risus eget, efficitur dolor. Etiam vel elementum eros.
  
  Donec neque erat, sodales sed elementum vitae, mattis sit amet sem. Donec fermentum urna odio, eget iaculis risus venenatis ac. Etiam vel nisl sit amet eros ultrices accumsan id non lacus. Phasellus et maximus augue, quis dignissim sapien. Quisque mattis ex non sem posuere, ut tincidunt mi dictum. Proin luctus tempus metus, et tempor ante pellentesque eu. Sed maximus nulla et facilisis ullamcorper. Vivamus velit lectus, placerat et sapien sed, porttitor vulputate purus. Morbi pulvinar libero purus, nec volutpat enim posuere ut. Vivamus viverra mi et magna scelerisque bibendum.
  
  Vivamus lacinia elit sem, ac gravida risus mattis quis. Quisque at finibus lacus, eget consequat orci. Praesent condimentum ex sed lectus faucibus, a tempor lorem tristique. Cras ut velit nec urna sagittis consectetur a id lorem. Duis ultrices laoreet est vulputate accumsan. Aenean laoreet velit dui, at interdum elit ornare non. Integer tempus vel enim quis convallis. Donec ut dictum purus. Nulla rutrum interdum eros molestie pretium. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec accumsan nisl pulvinar nisi auctor faucibus. Morbi quis arcu imperdiet, imperdiet odio sed, gravida ligula. Phasellus leo tortor, feugiat at tristique a, auctor in sem. Sed nulla elit, finibus in sagittis quis, ultricies et ipsum. Suspendisse dapibus volutpat tortor, a porttitor enim iaculis ut. Ut id ullamcorper risus, ut varius tortor. `;
  showFullText = false;

  ngOnInit(): void {
    this.initializeTopics();
    this.adjustMenu();
    window.addEventListener('resize', this.adjustMenu.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.adjustMenu.bind(this));
  }

  initializeTopics(): void {
    this.topics = [
      {
        title: 'Assunto da pergunta aparece aqui',
        description:
          'Comecinho da pergunta aparece aqui resente relato inscreve-se no campo da análise da dimensão e impacto de processo formativo situado impacto de processo formativo processo...',
        author: 'Carlos Henrique Santos',
        answered: true,
        likes: 2,
        replies: [
          {
            author: 'Adriano da Silva',
            description:
              'Resposta do autor é aqui. Relato inscreve-se no campo da análise da dimensão e impacto de processo formativo situado impacto de processo formativo processo resente relato inscreve-se no campo da análise da dimensão e impacto de processo formativo situado impacto de processo formativo processo.',
            type: 'Autor',
          },
          {
            author: 'Carlos Henrique Santos',
            description:
              'Consegui entender melhor agora! Parece que a variação da análise da dimensão e impacto de processo formativo situado impacto de processo formativo.',
            type: 'Coautor',
          },
          {
            author: 'Carlos Henrique Santos',
            description:
              'Consegui entender melhor agora! Parece que a variação da análise da dimensão e impacto de processo formativo situado impacto de processo formativo.',
            type: '',
          },
        ],
        open: false,
      },
    ];
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.adjustMenu();
  }

  toggleMenu(event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
    }
    if (window.innerWidth <= 768) {
      this.menuOpen = !this.menuOpen;
      this.showMenuBtn = !this.menuOpen;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement | null;

    if (
      target &&
      !target.closest('#menu') &&
      this.menuOpen &&
      window.innerWidth <= 768
    ) {
      this.menuOpen = false;
      this.showMenuBtn = true;
    }
  }

  adjustMenu(): void {
    if (window.innerWidth <= 768) {
      this.showMenuBtn = !this.menuOpen;
    } else {
      this.menuOpen = true;
      this.showMenuBtn = false;
    }
  }

  toggleText() {
    this.showFullText = !this.showFullText;
    console.log(this.showFullText);
  }

  goToUndefined() {
    window.location.href = 'http://localhost:4200/';
  }

  createTopic() {
    this.createTopicForm = true;
  }

  sendTopic() {
    // if (this.topicTitle === '' || this.topicDescription === '') {
    //   alert('Preencha todos os campos');
    //   return;
    // }
    this.feedback = true;
    this.createTopicForm = false;
    this.topicSended = true;

    if (this.isEditing) {
      this.isEditing = false;
      this.topics[0].title = this.topicTitle;
      this.topics[0].description = this.topicDescription;
    } else {
      this.topics.unshift({
        title: this.topicTitle,
        description: this.topicDescription,
        author: 'Não tinha essa informação no figma',
        answered: false,
        likes: 0,
        replies: [],
        open: false,
      });
    }

    this.topicTitle = '';
    this.topicDescription = '';
  }

  editTopic(topic: Topic) {
    this.isEditing = true;
    this.createTopicForm = true;
    this.topicTitle = topic.title;
    this.topicDescription = topic.description;
  }

  giveLike(topic: Topic) {
    if (this.canGiveLike) {
      topic.likes++;
      this.canGiveLike = false;
    } else {
      topic.likes--;
      this.canGiveLike = true;
    }
  }

  toggleOpenTopic(topic: Topic) {
    topic.open = !topic.open;
  }
}
