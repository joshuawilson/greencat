package org.GreenCat.model;

import javax.persistence.Entity;
import java.io.Serializable;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Column;
import javax.persistence.Version;
import java.util.Set;
import java.util.HashSet;
import org.GreenCat.model.Words;
import javax.persistence.ManyToMany;
import javax.xml.bind.annotation.XmlRootElement;
import javax.validation.constraints.Pattern;

@Entity
@XmlRootElement
public class Websites implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", updatable = false, nullable = false)
	private Long id;
	@Version
	@Column(name = "version")
	private int version;

	@ManyToMany
	private Set<Words> wordsId = new HashSet<Words>();

	@Column
	@Pattern(regexp = "^(http://|https://)?(www.)?([a-zA-Z0-9]+).[a-zA-Z0-9]*.[a-z]{3}.?([a-z]+)?$")
	private String url;

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
		if (!(obj instanceof Websites)) {
			return false;
		}
		Websites other = (Websites) obj;
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

	public Set<Words> getWordsId() {
		return this.wordsId;
	}

	public void setWordsId(final Set<Words> wordsId) {
		this.wordsId = wordsId;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	@Override
	public String toString() {
		String result = getClass().getSimpleName() + " ";
		if (url != null && !url.trim().isEmpty())
			result += "url: " + url;
		return result;
	}
}