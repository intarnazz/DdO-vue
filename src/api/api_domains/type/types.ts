import { Contact } from '@/api/api_domains/contact/contact'
import Rest from '@/api/web_services/rest'
import { CatalogModel } from '@/models/catalogModel'

class ContactsModel extends CatalogModel<Contact> {
  private rest = new Rest('type')

  async load(limit: number = 99): Promise<void> {
    if (!this.hasMore) return

    const res = await this.rest.all({
      limit: limit,
      offset: this.count,
      order: 'id',
    })

    if (!res.success) return

    if (res.data) this.setItems(res.data, Contact)
    this.setPaging(res.pagingInfo)
  }
}

export const types = new ContactsModel()
