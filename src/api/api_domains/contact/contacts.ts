import { contact as contactApi } from '@/api/api'
import { Contact } from '@/api/api_domains/contact/contact'
import { CatalogModel } from '@/models/catalogModel'

class ContactsModel extends CatalogModel<Contact> {
  async load(limit: number = 99): Promise<void> {
    if (!this.hasMore) return

    const res = await contactApi.all({
      limit: limit,
      offset: this.count,
    })

    if (!res.success) return

    if (res.data) this.setItems(res.data, Contact)
    this.setPaging(res.pagingInfo)
  }
}

export const contacts = new ContactsModel()
