import { configManager } from '../enhance.config';
import { addClass, announceToScreenReader, createElement, removeClass, trapFocus } from '../utils/a11y';

interface Command {
  id: string;
  label: string;
  description?: string;
  action: () => void;
  keywords?: string[];
  category?: string;
}

export class CommandPalette {
  private palette: HTMLElement | null = null;
  private input: HTMLInputElement | null = null;
  private list: HTMLElement | null = null;
  private isOpen = false;
  private commands: Command[] = [];
  private filteredCommands: Command[] = [];
  private selectedIndex = 0;
  private disposeFocusTrap: (() => void) | null = null;

  constructor() {
    this.init();
  }

  private init(): void {
    const config = configManager.get('palette');
    if (!config.enabled) return;

    this.setupCommands();
    this.createPalette();
    this.bindEvents();
  }

  private setupCommands(): void {
    this.commands = [
      {
        id: 'toggle-theme',
        label: 'Toggle Theme',
        description: 'Switch between light and dark mode',
        action: () => this.toggleTheme(),
        keywords: ['theme', 'dark', 'light', 'mode'],
        category: 'Appearance'
      },
      {
        id: 'scroll-top',
        label: 'Scroll to Top',
        description: 'Return to the top of the page',
        action: () => this.scrollToTop(),
        keywords: ['scroll', 'top', 'up'],
        category: 'Navigation'
      },
      {
        id: 'scroll-bottom',
        label: 'Scroll to Bottom',
        description: 'Go to the bottom of the page',
        action: () => this.scrollToBottom(),
        keywords: ['scroll', 'bottom', 'down'],
        category: 'Navigation'
      },
      {
        id: 'copy-email',
        label: 'Copy Email',
        description: 'Copy contact email to clipboard',
        action: () => this.copyEmail(),
        keywords: ['copy', 'email', 'contact'],
        category: 'Contact'
      },
      {
        id: 'toggle-enhancements',
        label: 'Toggle Enhancements',
        description: 'Enable or disable futuristic effects',
        action: () => this.toggleEnhancements(),
        keywords: ['enhancements', 'effects', 'toggle'],
        category: 'Settings'
      },
      {
        id: 'reduce-motion',
        label: 'Reduce Motion',
        description: 'Disable animations for better accessibility',
        action: () => this.reduceMotion(),
        keywords: ['reduce', 'motion', 'accessibility'],
        category: 'Accessibility'
      }
    ];
  }

  private createPalette(): void {
    this.palette = createElement('div', 'fx-command-palette');
    this.palette.setAttribute('role', 'dialog');
    this.palette.setAttribute('aria-label', 'Command Palette');
    this.palette.setAttribute('aria-hidden', 'true');

    const overlay = createElement('div', 'fx-command-palette-overlay');
    overlay.addEventListener('click', () => this.close());

    const container = createElement('div', 'fx-command-palette-container');
    
    this.input = createElement('input', 'fx-command-palette-input') as HTMLInputElement;
    this.input.setAttribute('type', 'text');
    this.input.setAttribute('placeholder', 'Type a command or search...');
    this.input.setAttribute('aria-label', 'Search commands');

    this.list = createElement('div', 'fx-command-palette-list');
    this.list.setAttribute('role', 'listbox');
    this.list.setAttribute('aria-label', 'Commands');

    container.appendChild(this.input);
    container.appendChild(this.list);
    this.palette.appendChild(overlay);
    this.palette.appendChild(container);
    document.body.appendChild(this.palette);
  }

  private bindEvents(): void {
    // Keyboard shortcut
    document.addEventListener('keydown', this.handleKeyDown);
    
    // Input events
    if (this.input) {
      this.input.addEventListener('input', this.handleInput);
      this.input.addEventListener('keydown', this.handleInputKeyDown);
    }
  }

  private handleKeyDown = (e: KeyboardEvent): void => {
    // Open palette with Ctrl/Cmd + K
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      this.toggle();
    }
    
    // Close with Escape
    if (e.key === 'Escape' && this.isOpen) {
      this.close();
    }
  };

  private handleInput = (): void => {
    if (!this.input) return;
    
    const query = this.input.value.toLowerCase();
    this.filterCommands(query);
    this.renderCommands();
    this.selectedIndex = 0;
  };

  private handleInputKeyDown = (e: KeyboardEvent): void => {
    if (!this.isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.selectedIndex = Math.min(this.selectedIndex + 1, this.filteredCommands.length - 1);
        this.updateSelection();
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
        this.updateSelection();
        break;
      case 'Enter':
        e.preventDefault();
        this.executeSelectedCommand();
        break;
    }
  };

  private filterCommands(query: string): void {
    if (!query.trim()) {
      this.filteredCommands = [...this.commands];
      return;
    }

    this.filteredCommands = this.commands.filter(command => {
      const searchText = [
        command.label,
        command.description || '',
        ...(command.keywords || []),
        command.category || ''
      ].join(' ').toLowerCase();
      
      return searchText.includes(query);
    });
  }

  private renderCommands(): void {
    if (!this.list) return;

    this.list.innerHTML = '';

    if (this.filteredCommands.length === 0) {
      const noResults = createElement('div', 'fx-command-palette-item fx-command-palette-no-results');
      noResults.textContent = 'No commands found';
      this.list.appendChild(noResults);
      return;
    }

    this.filteredCommands.forEach((command, index) => {
      const item = createElement('div', 'fx-command-palette-item');
      item.setAttribute('role', 'option');
      item.setAttribute('aria-selected', 'false');
      item.setAttribute('data-index', index.toString());

      const label = createElement('div', 'fx-command-palette-item-label');
      label.textContent = command.label;

      const description = createElement('div', 'fx-command-palette-item-description');
      description.textContent = command.description || '';

      const category = createElement('div', 'fx-command-palette-item-category');
      category.textContent = command.category || '';

      item.appendChild(label);
      item.appendChild(description);
      item.appendChild(category);

      item.addEventListener('click', () => {
        this.selectedIndex = index;
        this.executeSelectedCommand();
      });

      this.list.appendChild(item);
    });

    this.updateSelection();
  }

  private updateSelection(): void {
    if (!this.list) return;

    const items = this.list.querySelectorAll('.fx-command-palette-item');
    items.forEach((item, index) => {
      const isSelected = index === this.selectedIndex;
      item.setAttribute('aria-selected', isSelected.toString());
      
      if (isSelected) {
        addClass(item as HTMLElement, 'fx-command-palette-item-selected');
        item.scrollIntoView({ block: 'nearest' });
      } else {
        removeClass(item as HTMLElement, 'fx-command-palette-item-selected');
      }
    });
  }

  private executeSelectedCommand(): void {
    const command = this.filteredCommands[this.selectedIndex];
    if (command) {
      command.action();
      this.close();
    }
  }

  private toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  private open(): void {
    if (this.isOpen || !this.palette || !this.input) return;

    this.isOpen = true;
    this.palette.setAttribute('aria-hidden', 'false');
    addClass(this.palette, 'fx-command-palette-open');
    
    // Focus input
    setTimeout(() => {
      this.input!.focus();
    }, 100);

    // Setup focus trap
    this.disposeFocusTrap = trapFocus(this.palette);

    // Show all commands initially
    this.filteredCommands = [...this.commands];
    this.renderCommands();
    this.selectedIndex = 0;

    announceToScreenReader('Command palette opened');
  }

  private close(): void {
    if (!this.isOpen || !this.palette) return;

    this.isOpen = false;
    this.palette.setAttribute('aria-hidden', 'true');
    removeClass(this.palette, 'fx-command-palette-open');
    
    if (this.input) {
      this.input.value = '';
    }

    if (this.disposeFocusTrap) {
      this.disposeFocusTrap();
      this.disposeFocusTrap = null;
    }

    announceToScreenReader('Command palette closed');
  }

  // Command actions
  private toggleTheme(): void {
    // This would integrate with your theme system
    console.log('Toggle theme');
  }

  private scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private scrollToBottom(): void {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  private copyEmail(): void {
    const email = 'contact@ioriimasu.com'; // Replace with actual email
    navigator.clipboard.writeText(email).then(() => {
      announceToScreenReader('Email copied to clipboard');
    });
  }

  private toggleEnhancements(): void {
    // This would toggle all enhancements
    console.log('Toggle enhancements');
  }

  private reduceMotion(): void {
    // This would disable motion
    console.log('Reduce motion');
  }

  public destroy(): void {
    document.removeEventListener('keydown', this.handleKeyDown);
    
    if (this.disposeFocusTrap) {
      this.disposeFocusTrap();
    }
    
    if (this.palette && this.palette.parentNode) {
      this.palette.parentNode.removeChild(this.palette);
    }
  }
}

export const mountPalette = (): (() => void) => {
  const palette = new CommandPalette();
  return () => palette.destroy();
};
