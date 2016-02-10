/*******************************************************************************
 * Copyright (c) 2016 Red Hat, Inc.
 * Distributed under license by Red Hat, Inc. All rights reserved.
 * This program is made available under the terms of the
 * Eclipse Public License v1.0 which accompanies this distribution,
 * and is available at http://www.eclipse.org/legal/epl-v10.html
 *
 *  Contributors:
 *       Red Hat, Inc. - initial API and implementation
 *******************************************************************************/
package org.GreenCat.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;

import org.apache.commons.io.IOUtils;
//import org.jsoup.Jsoup;
import org.jsoup.Jsoup;


/**
 * A utility class to retrieve HTML page content
 * 
 * @author Victor Rubezhny
 */
public class HTMLReader {
	private static final String EMPTY = "";
	
	/**
	 * Reads a Plain Text from Web Page HTML into a String by a given URL
	 * 
	 * 
	 * @param url - URL of web page to read
	 * @return String Pain Text from an HTML page returned by a web server
	 */
    public static String readHTML(String url) {
        URL anURL;
		try {
			anURL = new URL(url);
		} catch (MalformedURLException e) {
			return EMPTY;
		}

		URLConnection con = null;
		try {
	        con = anURL.openConnection();
	        if (con instanceof HttpURLConnection) {
	        	HttpURLConnection httpCon = (HttpURLConnection)con;
	        	int status = httpCon.getResponseCode();
	        	String message = httpCon.getResponseMessage();
//	        	System.out.println("Response code: " + status + ", Error: " + message);

	        	if ((status >= 300) && (status < 400)) {
//	        		for (String f : httpCon.getHeaderFields().keySet()) {
//	        			System.out.println("HF: " + f + ": Value = " + httpCon.getHeaderField(f));
//	        		}
	        		String location = httpCon.getHeaderField("Location");
	        		if (location != null && !location.equals(anURL)) {
	        			return readHTMLAsText(location);
	        		}
	        	}
	        	if (status != 200) {
	        		return "";
	        	}
	        }

	        InputStream in = con.getInputStream();
	        String encoding = con.getContentEncoding();
	        encoding = encoding == null ? "UTF-8" : encoding;
//	        System.out.println("Encoding is: " + encoding);

	        
	        String body = IOUtils.toString(in, encoding);
	        return body;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return EMPTY;
		} 
    }
        
        
	/**
	 * Reads a Plain Text from Web Page HTML into a String by a given URL
	 * 
	 * 
	 * @param url - URL of web page to read
	 * @return String Pain Text from an HTML page returned by a web server
	 */
    public static String readHTMLAsText(String url) {
    	try {
			return Jsoup.parse(readHTML(url)).text();
		} catch (Exception e) {
			e.printStackTrace();
	    	return EMPTY;
		}
    }
  	
    
	public static void main(String[] args) {

//		String[] newargs = {"http://www.oracle.com", "http://www.redhat.com"};
//		String[] newargs = {"http://www.elcaro.moc", "ht", "http://www.oracle.com/some-non-existing-page.html"};
//		String[] newargs = {"http://www.oracle.com/some-non-existing-page.html"};
		String[] newargs = {"http://www.yandex.ru"};
				
		

		for (String arg: newargs) {
			System.out.println("URL: " + arg);
			try {
				System.out.println(
				HTMLReader.readHTMLAsText(arg)
				);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
}
