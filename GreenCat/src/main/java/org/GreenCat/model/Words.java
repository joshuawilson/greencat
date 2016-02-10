package org.GreenCat.model;

import javax.persistence.Entity;
import java.io.Serializable;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Column;
import javax.persistence.Version;
import org.GreenCat.model.Websites;
import java.util.Set;
import java.util.HashSet;
import javax.persistence.ManyToMany;
import javax.xml.bind.annotation.XmlRootElement;
@Entity
@XmlRootElement
public class Words implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", updatable = false, nullable = false)
	private Long id;
	@Version
	@Column(name = "version")
	private int version;

	@Column
	private String word;

	@Column
	private Long count;

	@Column
	private Boolean filtered;

	@ManyToMany(mappedBy = "wordsId")
	private Set<Websites> websitesId = new HashSet<Websites>();

	public Long getId() {
		return this.id;
	}

	public void setId(final Long id) {
		this.id = id;
	}

	public int getVersion() {
		return this.version;
	}

	public void setVersion(final int version) {
		this.version = version;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (!(obj instanceof Words)) {
			return false;
		}
		Words other = (Words) obj;
		if (id != null) {
			if (!id.equals(other.id)) {
				return false;
			}
		}
		return true;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	public String getWord() {
		return word;
	}

	public void setWord(String Word) {
		this.word = Word;
	}

	public Long getCount() {
		return count;
	}

	public void setCount(Long count) {
		this.count = count;
	}

	public Boolean getFiltered() {
		return filtered;
	}

	public void setFiltered(Boolean filtered) {
		this.filtered = filtered;
	}

	@Override
	public String toString() {
		String result = getClass().getSimpleName() + " ";
		if (word != null && !word.trim().isEmpty())
			result += "word: " + word;
		if (count != null)
			result += ", count: " + count;
		if (filtered != null)
			result += ", filtered: " + filtered;
		return result;
	}

	public Set<Websites> getWebsitesId() {
		return this.websitesId;
	}

	public void setWebsitesId(final Set<Websites> websitesId) {
		this.websitesId = websitesId;
	}
}