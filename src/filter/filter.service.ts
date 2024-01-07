import { Injectable } from '@nestjs/common';
import { DefaultService } from 'src/resource/default.service';
import { Filter } from './entities/filter.entity';
import { ListNewEntities } from './dto/list-new.dto';
import * as fs from 'fs';
import { JSDOM } from 'jsdom';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FilterService extends DefaultService<Filter> {
  constructor(
    @InjectRepository(Filter)
    protected repository: Repository<Filter>,
  ) {
    super(repository);
  }

  async find99freelas({ page, q }: ListNewEntities) {
    // const { data } = await this.httpService
    //   .get('https://www.99freelas.com.br/projects', {
    //     params: {
    //       q,
    //       page,
    //       order: 'mais-recentes',
    //       'data-da-publicacao': 'menos-de-24-horas-atras',
    //     },
    //   })
    //   .toPromise();

    const data = fs.readFileSync('data.html', {
      encoding: 'utf-8',
    });

    const html = new JSDOM(data).window.document.body.querySelector(
      '.result-list',
    ).innerHTML;

    const projectsElements = new JSDOM(html).window.document.querySelectorAll(
      '.result-item',
    );

    const projects = [];

    const BASE_URL = 'https://www.99freelas.com.br';
    for (const projectElement of projectsElements) {
      const title = projectElement.querySelector('.title a').textContent;

      const url = projectElement.querySelector('.title a').getAttribute('href');

      const category = projectElement
        .querySelector('.information')
        .textContent.split('|')[0]
        .trim();

      const datetime = Number(
        projectElement.querySelector('.datetime').getAttribute('cp-datetime'),
      );

      const informationB = projectElement.querySelectorAll('.information b');

      const proposals = Number(informationB[2].textContent);
      const interested = Number(informationB[3].textContent);

      const description =
        projectElement.querySelector('.description').textContent;

      const habilitiesQuery = projectElement.querySelectorAll(
        '.habilidades .habilidade',
      );
      const habilities = [];

      for (const habilidade of habilitiesQuery) {
        habilities.push(habilidade.textContent);
      }

      const clientName = projectElement
        .querySelector('.client a')
        ?.textContent?.trim();

      const clientUrl = projectElement
        .querySelector('.client a')
        ?.getAttribute('href');

      const clientAvaliation = projectElement
        .querySelector('.avaliacoes-star')
        .getAttribute('data-score');

      const clientAvaliationCount = projectElement
        .querySelector('.avaliacoes-text')
        .textContent.replace(/\D/g, '');

      projects.push({
        title,
        url: BASE_URL + url,
        category,
        datetime,
        proposals,
        interested,
        description,
        habilities,
        client: {
          name: clientName,
          url: clientUrl,
          avaliation: +clientAvaliation,
          avaliationCount: +clientAvaliationCount,
        },
      });
    }

    return projects;
  }
}
