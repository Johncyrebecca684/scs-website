import os
import re

directory = r"C:\Users\Admin\Downloads\scs-website-main (2)\scs-website-main"
html_files = [f for f in os.listdir(directory) if f.endswith('.html')]

domain = "https://www.thesalavailaundry.com"
business_name = "Salavai Laundry"
alternate_name = "System Cares IT Solutions"

seo_meta_template = """
  <meta name="description" content="{desc}">
  <meta name="keywords" content="{keywords}">
  <meta name="author" content="System Cares IT Solutions">
  <meta name="robots" content="index, follow">
  <meta name="theme-color" content="#ff0000">
  <link rel="canonical" href="{url}">
  
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{desc}">
  <meta property="og:image" content="{domain}/scs%20logo.png">
  <meta property="og:url" content="{url}">
  <meta property="og:type" content="website">
  
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{title}">
  <meta name="twitter:description" content="{desc}">

  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "{business_name}",
    "alternateName": "{alternate_name}",
    "image": "{domain}/scs%20logo.png",
    "url": "{domain}",
    "telephone": "+919789020311",
    "address": {{
      "@type": "PostalAddress",
      "streetAddress": "3/299, Binu Towers EVR Periyar Salai, ECR, Palavakkam",
      "addressLocality": "Chennai",
      "postalCode": "600041",
      "addressCountry": "IN"
    }},
    "description": "{desc}"
  }}
  </script>
"""

page_configs = {
    "index.html": {
        "title": "System Cares IT Solutions | Cloud, Cyber Security & Laundry CRM",
        "desc": "System Cares IT Solutions is your end-to-end technology partner providing Cloud Solutions, Cyber Security, POS & CRM for Laundry, and Digital Marketing.",
        "keywords": "IT Solutions, Cloud Solutions, Cyber Security, Laundry POS, Laundry CRM, Digital Marketing, System Cares",
    },
    "about.html": {
        "title": "About Us | System Cares IT Solutions",
        "desc": "Learn about System Cares IT Solutions, founded in 2003. We provide Cloud, Cybersecurity, and purpose-built technology solutions for the laundry industry.",
        "keywords": "About System Cares, IT Support Provider, Cloud Partner, Cybersecurity Partner, Laundry Technology",
    },
    "cloud.html": {
        "title": "Cloud Services & Infrastructure | System Cares IT Solutions",
        "desc": "Scale your business with secure, reliable cloud solutions including Cloud Migration, Microsoft 365, Backup & Disaster Recovery, and Tally On Cloud.",
        "keywords": "Cloud Services, Cloud Migration, Cloud Infrastructure, AWS, Microsoft Azure, Tally On Cloud, Cloud Backup",
    },
    "crm.html": {
        "title": "Laundry POS & CRM Software | System Cares IT Solutions",
        "desc": "Purpose-built POS & CRM software tailored exclusively for the laundry industry. Streamline operations, track orders, and boost customer retention.",
        "keywords": "Laundry POS, Laundry CRM, Dry Cleaning Software, Laundry Management Software, System Cares CRM",
    },
    "cyber.html": {
        "title": "Cyber Security Services | System Cares IT Solutions",
        "desc": "Protect your business with advanced cyber security solutions including endpoint protection, firewall management, and security audits.",
        "keywords": "Cyber Security, Endpoint Protection, Firewall Management, Security Audits, Malware Protection",
    },
    "digital-marketing.html": {
        "title": "Digital Marketing & SEO | System Cares IT Solutions",
        "desc": "Full-stack digital marketing strategies, SEO, branding, and online growth services to elevate your brand presence and drive leads.",
        "keywords": "Digital Marketing, SEO, Search Engine Optimization, Branding, Social Media Marketing, Lead Generation",
    }
}

for filename in html_files:
    filepath = os.path.join(directory, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Meta Tags Optimization
    if '<meta name="description"' not in content:
        config = page_configs.get(filename, page_configs["index.html"])
        
        # Replace existing <title>
        content = re.sub(r'<title>.*?</title>', f'<title>{config["title"]}</title>', content, flags=re.IGNORECASE)
        
        seo_meta = seo_meta_template.format(
            title=config["title"],
            desc=config["desc"],
            keywords=config["keywords"],
            url=f"{domain}/{filename}" if filename != "index.html" else f"{domain}/",
            domain=domain,
            business_name=business_name,
            alternate_name=alternate_name
        )
        
        # Insert after <meta name="viewport"...>
        viewport_match = re.search(r'<meta\s+name="viewport"[^>]+>', content, re.IGNORECASE)
        if viewport_match:
            pos = viewport_match.end()
            content = content[:pos] + "\n" + seo_meta + content[pos:]
            print(f"Added meta tags to {filename}")

    # 2. Image SEO
    def img_replacer(match):
        img_tag = match.group(0)
        if 'loading=' not in img_tag and 'nav-logo-badge' not in img_tag:
            # only add lazy if it's not the top logo
            img_tag = img_tag.replace('<img ', '<img loading="lazy" ')
        if 'alt=' not in img_tag:
            img_tag = img_tag.replace('<img ', '<img alt="System Cares Image" ')
        return img_tag
    
    content = re.sub(r'<img\s+[^>]+>', img_replacer, content, flags=re.IGNORECASE)

    # 3. Headings Optimization
    if '<h1' not in content.lower():
        if filename == "index.html":
            content = content.replace('<h2 class="hero-title">', '<h1 class="hero-title">')
            content = content.replace('</h2>\n            \n            <p class="hero-tagline">', '</h1>\n            \n            <p class="hero-tagline">')
        elif filename == "crm.html":
            content = content.replace('<h2 class="text-4xl md:text-5xl font-bold mb-6">', '<h1 class="text-4xl md:text-5xl font-bold mb-6">')
            content = re.sub(r'(<h1 class="text-4xl md:text-5xl font-bold mb-6">.*?)</h2>', r'\1</h1>', content, flags=re.DOTALL)
        elif filename == "cyber.html":
            content = content.replace('<h2 class="hero-title" data-aos="fade-up">', '<h1 class="hero-title" data-aos="fade-up">')
            content = re.sub(r'(<h1 class="hero-title"[^>]*>.*?)</h2>', r'\1</h1>', content, flags=re.DOTALL)
        # Add about.html
        elif filename == "about.html":
            content = content.replace('<h2>Who We Are</h2>', '<h1>Who We Are</h1>')

    # Preload critical assets
    if '<link rel="preconnect" href="https://fonts.googleapis.com">' not in content:
        preconnect_tags = '\n  <link rel="preconnect" href="https://fonts.googleapis.com">\n  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
        head_match = re.search(r'<head>', content, re.IGNORECASE)
        if head_match:
            pos = head_match.end()
            content = content[:pos] + preconnect_tags + content[pos:]

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Processed {filename}")
