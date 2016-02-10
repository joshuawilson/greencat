package org.GreenCat.rest;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Set;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.OptimisticLockException;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriBuilder;

import org.GreenCat.logic.WordStatistics;
import org.GreenCat.model.Websites;
import org.GreenCat.model.Words;
import org.GreenCat.util.HTMLReader;
import org.GreenCat.logic.*;
import org.GreenCat.rest.*;

/**
 * 
 */
@Stateless
@Path("/websites")
public class WebsitesEndpoint {
	@PersistenceContext(unitName = "GreenCat-persistence-unit")
	private EntityManager em;

	@POST
	@Consumes("application/json")
	public Response create(@QueryParam("url") String url) {
		HTMLReader reader = new HTMLReader();
		String content = reader.readHTMLAsText(url);
		WordStatistics wstats = new WordStatistics();
		Stats allStats = wstats.getWordCounts(content, Collections.EMPTY_LIST);
		
		Websites website = new Websites();
		website.setUrl(url);
		em.persist(website);
		
		for(String w : allStats.wordCounts.keySet()){
			Words word = new Words();
			word.setFiltered(false);
			word.setWord(w);
			word.setCount(Long.valueOf(allStats.wordCounts.get(w)));
			Set<Websites> websitesId = word.getWebsitesId();
			websitesId.add(website);
			word.setWebsitesId(websitesId);
			
			em.persist(word);
		}
		
		return Response.created(
				UriBuilder.fromResource(WebsitesEndpoint.class)
						.path(String.valueOf(website.getId())).build()).build();
	}
	
	
	@DELETE
	@Path("/{id:[0-9][0-9]*}")
	public Response deleteById(@PathParam("id") Long id) {
		Websites entity = em.find(Websites.class, id);
		if (entity == null) {
			return Response.status(Status.NOT_FOUND).build();
		}
		em.remove(entity);
		return Response.noContent().build();
	}

	@GET
	@Path("/{id:[0-9][0-9]*}")
	@Produces("application/json")
	public Response findById(@PathParam("id") Long id) {
		TypedQuery<Websites> findByIdQuery = em
				.createQuery(
						"SELECT DISTINCT w FROM Websites w LEFT JOIN FETCH w.wordsId WHERE w.id = :entityId ORDER BY w.id",
						Websites.class);
		findByIdQuery.setParameter("entityId", id);
		Websites entity;
		try {
			entity = findByIdQuery.getSingleResult();
		} catch (NoResultException nre) {
			entity = null;
		}
		if (entity == null) {
			return Response.status(Status.NOT_FOUND).build();
		}
		return Response.ok(entity).build();
	}

	@GET
	@Produces("application/json")
	public List<Websites> listAll(@QueryParam("start") Integer startPosition,
			@QueryParam("max") Integer maxResult) {
		TypedQuery<Websites> findAllQuery = em
				.createQuery(
						"SELECT DISTINCT w FROM Websites w LEFT JOIN FETCH w.wordsId ORDER BY w.id",
						Websites.class);
		if (startPosition != null) {
			findAllQuery.setFirstResult(startPosition);
		}
		if (maxResult != null) {
			findAllQuery.setMaxResults(maxResult);
		}
		final List<Websites> results = findAllQuery.getResultList();
		return results;
	}

	@PUT
	@Path("/{id:[0-9][0-9]*}")
	@Consumes("application/json")
	public Response update(@PathParam("id") Long id, Websites entity) {
		if (entity == null) {
			return Response.status(Status.BAD_REQUEST).build();
		}
		if (id == null) {
			return Response.status(Status.BAD_REQUEST).build();
		}
		if (!id.equals(entity.getId())) {
			return Response.status(Status.CONFLICT).entity(entity).build();
		}
		if (em.find(Websites.class, id) == null) {
			return Response.status(Status.NOT_FOUND).build();
		}
		try {
			entity = em.merge(entity);
		} catch (OptimisticLockException e) {
			return Response.status(Response.Status.CONFLICT)
					.entity(e.getEntity()).build();
		}

		return Response.noContent().build();
	}
}
