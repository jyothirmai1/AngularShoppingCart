import { Component } from "@angular/core";
import { Github, LucideAngularModule, Twitter } from "lucide-angular";
@Component({
  selector: "app-footer",
  imports: [LucideAngularModule],
  template: `
    <div class="w-full px-4 py-6 bg-linear-to-r from-emerald-600 to-sky-900 text-white mt-auto">
      <div class="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-sm">&copy; 2025 ShoppingCart. All rights reserved.</p>

        <nav aria-label="Footer navigation">
          <ul class="flex items-center gap-6 text-sm">
            <li><a href="#" class="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </nav>

        <div class="flex items-center gap-4 mr-2">
          <a href="#" aria-label="GitHub" class="hover:text-white transition-colors">
            <lucide-icon [img]="icons.Github" class="size-5" />
          </a>
          <a href="#" aria-label="Twitter" class="hover:text-white transition-colors">
            <lucide-icon [img]="icons.Twitter" class="size-5" />
          </a>
        </div>
      </div>
    </div>
  `,
})

export class FooterComponent{
    protected readonly icons = { Github, Twitter };

}